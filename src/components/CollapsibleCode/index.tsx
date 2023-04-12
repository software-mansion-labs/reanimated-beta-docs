import React from "react";
import CodeBlock from "@theme/CodeBlock";

interface Props {
  src: string;
  showLines: number[];
}

export default function CollapsibleCode({ src, showLines }: Props) {
  const [expand, setExpand] = React.useState(false);

  const [start, end] = showLines;

  const codeLines = src.split("\n");
  const linesToShow = codeLines.slice(start, end + 1).join("\n");

  return (
    <div>
      <button onClick={() => setExpand(!expand)}>
        {expand ? "Collapse" : "Expand"}
      </button>
      <CodeBlock language="jsx">{expand ? src : linesToShow}</CodeBlock>
    </div>
  );
}
