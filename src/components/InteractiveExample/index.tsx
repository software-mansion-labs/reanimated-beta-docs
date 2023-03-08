import React from "react";
import styles from "./styles.module.css";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function InteractiveExample(props: any) {
  const [showPreview, setShowPreview] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const sourceCode = require(`../../examples/${props.name}/code.txt`);
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
      </div>
      {showPreview ? (
        props.component
      ) : (
        <SyntaxHighlighter language="javascript" style={docco}>
          {sourceCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
