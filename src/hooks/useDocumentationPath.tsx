import { useLocation } from "@docusaurus/router";

const useDocumentationPath = () => {
  const location = useLocation();

  return {
    isDocumentation: location.pathname.startsWith("/docs"),
  };
};

export default useDocumentationPath;
