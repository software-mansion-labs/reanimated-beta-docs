import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useCopyToClipboard } from "usehooks-ts";
import clsx from "clsx";

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

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div
          className={`${styles.container} ${!showPreview ? styles.code : ""}`}
        >
          <div className={styles.buttonsContainer}>
            <button
              className={clsx(
                styles.modeButton,
                showPreview ? styles.active : ""
              )}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
            <button
              className={clsx(
                styles.modeButton,
                !showPreview ? styles.active : ""
              )}
              onClick={() => setShowPreview(false)}
            >
              Code
            </button>
            <button
              onClick={() => {
                copy(sourceCode);
                setCopied(true);
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className={styles.previewContainer} data-ispreview={showPreview}>
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
              <button onClick={resetExample}>Reset</button>
            </div>
          )}
        </div>
      )}
    </BrowserOnly>
  );
}
