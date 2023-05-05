import React, { useState } from "react";
import styles from "./styles.module.css";
import Draggable from "react-draggable";

const PlaygroundChartPoint: React.FC<{
  label: string;
  startingPoint: { x: number; y: number };
  bounds: { x: number; y: number };
  pointMoveHandler?: (x: number, y: number) => void;
}> = ({ label, startingPoint, bounds, pointMoveHandler }) => {
  const [place, setPlace] = useState({
    x: startingPoint.x,
    y: startingPoint.y,
  });

  const handlePointDrag = (e, position) => {
    const { x, y } = position;

    setPlace({ x, y });
    pointMoveHandler(x, y);
  };

  return (
    <>
      <Draggable
        position={place}
        onDrag={handlePointDrag}
        bounds={{
          top: 0,
          left: 0,

          // Limit bound to the
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
