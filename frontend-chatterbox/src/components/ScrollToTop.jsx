import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_HEIGHT = 80; // Ajusta este valor si tu header es más alto

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/group/") || pathname.startsWith("/chatIA")) {
      window.scrollTo({ top: HEADER_HEIGHT, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;