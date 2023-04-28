import React from "react";
import { SkipToContentLink } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
export default function SkipToContent() {
  const location = useLocation();
  const isDocumentation = location.pathname.startsWith("/docs");
  return (
    <SkipToContentLink
      className={clsx(styles.skipToContent, !isDocumentation && styles.hidden)}
    />
  );
}
