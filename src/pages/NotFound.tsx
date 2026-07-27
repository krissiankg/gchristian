import { Link } from "react-router-dom";
import { ArrowLeft, Ghost } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-background pt-20 px-4">
      <Navbar />
      <div className="text-center w-full max-w-lg">
        <div className="relative mb-6 sm:mb-8">
          <h1 className="font-display text-[7rem] sm:text-[12rem] lg:text-[16rem] font-bold leading-none tracking-tighter text-foreground/5">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ghost className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-bounce" />
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {t.notFound.title}
        </h2>
        <p className="font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8 sm:mb-10">
          {t.notFound.text}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 font-display font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> {t.notFound.home}
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 sm:px-8 py-3 font-display font-semibold text-sm tracking-wide uppercase hover:bg-secondary transition-colors"
          >
            {t.notFound.projects}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
