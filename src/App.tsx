import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";

import Index from "./pages/Index";
import ProjectsListing from "./pages/ProjectsListing";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  // Show the loader only once per browser session (not on every page navigation or refresh)
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem("appLoaded") === "1");

  const handleLoaderComplete = () => {
    sessionStorage.setItem("appLoaded", "1");
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <PageLoader onComplete={handleLoaderComplete} />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsListing />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
