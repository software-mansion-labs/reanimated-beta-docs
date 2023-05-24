import { useLocation } from "@docusaurus/router";

const usePagePath = () => {
  const location = useLocation();

  return {
    isDocumentation: location.pathname.startsWith("/docs"),
    isLanding: location.pathname === "/",
  };
};

export default usePagePath;
