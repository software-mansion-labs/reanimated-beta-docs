import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useCopyToClipboard } from "usehooks-ts";

interface Props {
  src: string;
  component: React.ReactNode;
  showCode?: boolean; // whether to show code by default
}

export default function InteractiveExample({
  src,
  component,
  showCode = false,
}: Props) {
  const [_, copy] = useCopyToClipboard();
  const [key, setKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(!showCode);
  const [copied, setCopied] = React.useState(false);

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
          <div className={styles.buttonContainer}>
            <button
              className={showPreview ? styles.active : ""}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
            <button
              className={!showPreview ? styles.active : ""}
              onClick={() => setShowPreview(false)}
            >
              Code
            </button>
            <button
              onClick={() => {
                copy(src);
                setCopied(true);
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={resetExample}>Reset</button>
          </div>
          {showPreview ? (
            <React.Fragment key={key}>{component}</React.Fragment>
          ) : (
            <CodeBlock language="jsx">{src}</CodeBlock>
          )}
        </div>
      )}
    </BrowserOnly>
  );
}
