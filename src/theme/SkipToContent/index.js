import React from "react";
import { SkipToContentLink } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";
import useDocumentationPath from "@site/src/hooks/useDocumentationPath";
export default function SkipToContent() {
  const { isDocumentation } = useDocumentationPath();
  return (
    <SkipToContentLink
      className={clsx(styles.skipToContent, !isDocumentation && styles.hidden)}
    />
  );
}
