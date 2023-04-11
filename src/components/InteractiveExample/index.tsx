import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useCopyToClipboard } from "usehooks-ts";
import clsx from "clsx";

import Copy from "@site/static/img/copy.svg";
import CopyDark from "@site/static/img/copy-dark.svg";

import Reset from "@site/static/img/reset.svg";
import ResetDark from "@site/static/img/reset-dark.svg";
import { useColorMode } from "@docusaurus/theme-common";

interface Props {
  name: string;
  component: React.ReactNode;
  showCode?: boolean; // whether to show code by default
}

export default function InteractiveExample({
  name,
  component,
  showCode = false,
}: Props) {
  const [_, copy] = useCopyToClipboard();
  const [key, setKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(!showCode);
  const [copied, setCopied] = React.useState(false);
  const sourceCode = require(`../../examples/${name}/code.txt`);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(() => false), 1000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div
          className={`${styles.container} ${!showPreview ? styles.code : ""}`}
          data-ispreview={showPreview}
        >
          <div className={styles.buttonsContainer}>
            <button
              className={clsx(
                styles.actionButton,
                showPreview ? styles.actionButtonActive : ""
              )}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
            <button
              className={clsx(
                styles.actionButton,
                !showPreview ? styles.actionButtonActive : ""
              )}
              onClick={() => setShowPreview(false)}
            >
              Code
            </button>
            <div
              onClick={() => {
                if (!copied) {
                  copy(sourceCode);
                  setCopied(true);
                }
              }}
              className={clsx(
                styles.actionIcon,
                styles.copy,
                copied && styles.copyClicked
              )}
            >
              {colorMode === "light" ? <Copy /> : <CopyDark />}
            </div>
          </div>
          <div className={styles.previewContainer}>
            {showPreview ? (
              <React.Fragment key={key}>{component}</React.Fragment>
            ) : (
              <div className={styles.interactiveCodeBlock}>
                <CodeBlock language="jsx">{sourceCode}</CodeBlock>
              </div>
            )}
          </div>
          {showPreview && (
            <div className={styles.buttonsContainer}>
              <div onClick={resetExample} className={styles.actionIcon}>
                {colorMode === "light" ? <Reset /> : <ResetDark />}
              </div>
            </div>
          )}
        </div>
      )}
    </BrowserOnly>
  );
}
