import React from "react";
import styles from "./styles.module.css";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function InteractiveExample(props: any) {
  const [key, setKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const sourceCode = require(`../../examples/${props.name}/code.txt`);

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

  return (
    <div className={styles.container}>
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
        <React.Fragment key={key}>{props.component}</React.Fragment>
      ) : (
        <SyntaxHighlighter language="javascript" style={docco}>
          {sourceCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
