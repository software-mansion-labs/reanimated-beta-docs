import React from "react";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  name: string;
  component: React.ReactNode;
  showByDefault?: "preview" | "code";
}

export default function InteractiveExample({
  name,
  component,
  showByDefault = "preview",
}: Props) {
  const [key, setKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(
    showByDefault === "preview"
  );
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
            <button onClick={() => setCopied(true)}>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={resetExample}>Reset</button>
          </div>
          {showPreview ? (
            <React.Fragment key={key}>{component}</React.Fragment>
          ) : (
            <SyntaxHighlighter language="javascript" style={docco}>
              {sourceCode}
            </SyntaxHighlighter>
          )}
        </div>
      )}
    </BrowserOnly>
  );
}
