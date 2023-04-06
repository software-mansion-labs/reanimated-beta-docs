import React from "react";

interface Props {
  children: React.ReactNode;
  shownLines: number[][]; // [[1, 2], [4, 5]] means lines 1, 2, 4, 5 are shown
}
export default function CollapsibleCode({ children, shownLines }: Props) {
  console.log(children, shownLines);
  return <div>mleko</div>;
}
