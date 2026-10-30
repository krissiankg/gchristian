// Embeds copied from the old portfolio often carry params that silence the
// player (Vimeo `muted=1` / `background=1`, YouTube `mute=1`) and iframes
// without an `allow` attribute, so autoplay falls back to muted playback.

const IFRAME_ALLOW = "autoplay; fullscreen; picture-in-picture; encrypted-media";
const MUTING_PARAMS = ["muted", "mute", "background"];

/** Turn a page URL into an embeddable player URL and strip muting params. */
export function normalizeVideoSrc(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw.trim().replace(/&amp;/g, "&"));
  } catch {
    return raw;
  }

  const host = url.hostname.replace(/^www\./, "");

  // vimeo.com/123456789[/hash] -> player.vimeo.com/video/123456789[?h=hash]
  if (host === "vimeo.com") {
    const match = url.pathname.match(/^\/(\d+)(?:\/([a-z0-9]+))?/i);
    if (match) {
      const player = new URL(`https://player.vimeo.com/video/${match[1]}`);
      if (match[2]) player.searchParams.set("h", match[2]);
      url.searchParams.forEach((value, key) => player.searchParams.set(key, value));
      url = player;
    }
  }

  // mega.nz/file/ID#KEY -> mega.nz/embed/ID#KEY
  if (host === "mega.nz" && url.pathname.startsWith("/file/")) {
    url.pathname = url.pathname.replace(/^\/file\//, "/embed/");
  }

  MUTING_PARAMS.forEach((param) => url.searchParams.delete(param));
  if (url.hostname === "player.vimeo.com") url.searchParams.set("muted", "0");

  return url.toString();
}

/** Rewrite every iframe in an embed snippet so it can play with sound. */
export function normalizeVideoEmbed(html: string): string {
  if (typeof DOMParser === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (src) iframe.setAttribute("src", normalizeVideoSrc(src));
    iframe.setAttribute("allow", IFRAME_ALLOW);
    iframe.setAttribute("allowfullscreen", "");
  });
  doc.querySelectorAll("video").forEach((video) => {
    video.removeAttribute("muted");
    video.setAttribute("controls", "");
  });
  return doc.body.innerHTML;
}

export const VIDEO_IFRAME_ALLOW = IFRAME_ALLOW;
