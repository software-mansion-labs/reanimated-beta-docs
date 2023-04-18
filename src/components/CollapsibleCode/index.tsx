import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import Arrow from "@site/static/img/Arrow.svg";
import ArrowDark from "@site/static/img/Arrow-dark.svg";
import { useColorMode } from "@docusaurus/theme-common";

interface Props {
  src: string;
  showLines: number[];
}

export default function CollapsibleCode({ src, showLines }: Props) {
  const [expand, setExpand] = React.useState(false);
  const { colorMode } = useColorMode();

  if (!showLines) {
    return <CodeBlock language="jsx">{src}</CodeBlock>;
  }

  const [start, end] = showLines;

  const codeLines = src.split("\n");
  const linesToShow = codeLines.slice(start, end + 1).join("\n");

  return (
    <div className={styles.container}>
      <div
        className={styles.buttonContainer}
        data-isopen={expand}
        onClick={() => setExpand(!expand)}
      >
        {colorMode === "light" ? (
          <Arrow className={styles.arrow} />
        ) : (
          <ArrowDark className={styles.arrow} />
        )}

        <button>
          {expand ? "Collapse the full code" : "Expand the full code"}
        </button>
      </div>
      <CodeBlock language="jsx">{expand ? src : linesToShow}</CodeBlock>
    </div>
  );
}
