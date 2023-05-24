import React from "react";
import { SkipToContentLink } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";
import usePagePath from "@site/src/hooks/usePagePath";
export default function SkipToContent() {
  const { isDocumentation } = usePagePath();
  return (
    <SkipToContentLink
      className={clsx(styles.skipToContent, !isDocumentation && styles.hidden)}
    />
  );
}
