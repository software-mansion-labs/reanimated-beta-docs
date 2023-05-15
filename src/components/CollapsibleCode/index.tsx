import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import { useColorMode } from "@docusaurus/theme-common";
import CollapseButton from "@site/src/components/CollapseButton";

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
      <CollapseButton
        label="Collapse the full code"
        labelCollapsed="Expand the full code"
        collapsed={expand}
        onCollapse={() => setExpand(!expand)}
        className={styles.collapseButton}
      />
      <CodeBlock language="jsx">{expand ? src : linesToShow}</CodeBlock>
    </div>
  );
}
