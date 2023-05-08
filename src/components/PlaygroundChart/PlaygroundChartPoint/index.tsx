import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Draggable, { DraggableEvent } from "react-draggable";

const PlaygroundChartPoint: React.FC<{
  label: string;
  startingPoint: { x: number; y: number };
  bounds: { x: number; y: number };
  pointMoveHandler?: (x: number, y: number) => void;
  pointControls?: { x: number; y: number };
}> = ({ label, startingPoint, bounds, pointMoveHandler, pointControls }) => {
  const [place, setPlace] = useState<{
    x: number;
    y: number;
  }>({
    x: startingPoint.x,
    y: startingPoint.y,
  });

  const handlePointDrag = (e: DraggableEvent, position) => {
    const { x, y } = position;

    setPlace({ x, y });
    pointMoveHandler(x, y);
  };

  useEffect(() => {
    setPlace({
      x: pointControls.x,
      y: pointControls.y,
    });
  }, [pointControls.x, pointControls.y]);

  return (
    <>
      <Draggable
        position={place}
        onDrag={handlePointDrag}
        bounds={{
          top: 0,
          left: 0,

          // Limit bound to the borders,
          right: bounds.x - 24,
          bottom: bounds.y - 24,
        }}
      >
        <button className={styles.point}>{label}</button>
      </Draggable>
    </>
  );
};

export default PlaygroundChartPoint;
