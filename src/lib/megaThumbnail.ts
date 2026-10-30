// Mega stores each file's thumbnail encrypted with the file key, which lives in
// the link after `#`. We fetch the encrypted thumbnail through Mega's public API
// and decrypt it in the browser, so videos without a cover still get an image.

const API = "https://g.api.mega.co.nz/cs";
const THUMBNAIL_TYPE = 0;

const cache = new Map<string, Promise<string | null>>();

function b64urlDecode(s: string): Uint8Array<ArrayBuffer> {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").replace(/,/g, "");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** Extract the public handle and the 128-bit AES file key from a Mega file link. */
export function parseMegaLink(url: string): { handle: string; key: Uint8Array<ArrayBuffer> } | null {
  const match = url.match(/mega\.nz\/(?:file|embed)\/([\w-]+)#([\w-]+)/) || url.match(/mega\.nz\/#!([\w-]+)!([\w-]+)/);
  if (!match) return null;
  const full = b64urlDecode(match[2]);
  if (full.length !== 32) return null;
  // File key = first half XOR second half (the second half carries IV and MAC).
  const key = new Uint8Array(16);
  for (let i = 0; i < 16; i++) key[i] = full[i] ^ full[i + 16];
  return { handle: match[1], key };
}

async function api<T>(payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API}?id=${Date.now()}`, { method: "POST", body: JSON.stringify([payload]) });
  const json = await res.json();
  const result = Array.isArray(json) ? json[0] : json;
  if (typeof result === "number") throw new Error(`Mega API error ${result}`);
  return result as T;
}

/** AES-CBC decrypt with a zero IV and no padding (WebCrypto only does PKCS#7). */
async function decryptNoPadding(data: Uint8Array<ArrayBuffer>, rawKey: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
  const key = await crypto.subtle.importKey("raw", rawKey, "AES-CBC", false, ["encrypt", "decrypt"]);
  const lastBlock = data.slice(data.length - 16);
  // Forge a trailing block that decrypts to a full PKCS#7 padding block.
  const pad = new Uint8Array(16).fill(16);
  const forged = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv: lastBlock }, key, pad)).slice(0, 16);
  const input = new Uint8Array(data.length + 16);
  input.set(data);
  input.set(forged, data.length);
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, key, input));
}

/** Parse a file-attribute response: [8-byte handle][uint32 LE length][data]... */
function extractAttribute(buf: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
  if (buf.length >= 12) {
    const len = new DataView(buf.buffer, buf.byteOffset + 8, 4).getUint32(0, true);
    if (len > 0 && len % 16 === 0 && 12 + len <= buf.length) return buf.slice(12, 12 + len);
  }
  return buf;
}

async function loadThumbnail(url: string): Promise<string | null> {
  const link = parseMegaLink(url);
  if (!link) return null;

  const file = await api<{ fa?: string }>({ a: "g", p: link.handle });
  const fah = file.fa?.match(new RegExp(`(?:^|/)\\d+:${THUMBNAIL_TYPE}\\*([\\w-]+)`))?.[1];
  if (!fah) return null;

  const { p } = await api<{ p: string }>({ a: "ufa", fah, ssl: 2, r: 1 });
  const res = await fetch(`${p}/${THUMBNAIL_TYPE}`, { method: "POST", body: b64urlDecode(fah) });
  if (!res.ok) return null;

  const encrypted = extractAttribute(new Uint8Array(await res.arrayBuffer()));
  if (encrypted.length === 0 || encrypted.length % 16 !== 0) return null;
  const jpeg = await decryptNoPadding(encrypted, link.key);
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8) return null;

  return URL.createObjectURL(new Blob([jpeg], { type: "image/jpeg" }));
}

/** Object URL of the decrypted Mega thumbnail, or null when unavailable. */
export function getMegaThumbnail(url: string): Promise<string | null> {
  let pending = cache.get(url);
  if (!pending) {
    pending = loadThumbnail(url).catch((err) => {
      console.warn("Mega thumbnail unavailable:", err);
      cache.delete(url); // let a later visit retry after a transient failure
      return null;
    });
    cache.set(url, pending);
  }
  return pending;
}
