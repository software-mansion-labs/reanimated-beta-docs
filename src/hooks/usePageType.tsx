import { useLocation } from "@docusaurus/router";

const usePageType = () => {
  const location = useLocation();

  return {
    isDocumentation: location.pathname.startsWith("/docs"),
    isLanding: location.pathname === "/",
  };
};

export default usePageType;
