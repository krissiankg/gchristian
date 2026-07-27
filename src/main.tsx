import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
