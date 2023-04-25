import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const HeroSwirl = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.swirl}>
      <svg
        width={windowSize[0] * (windowSize[0] < 996 ? 1.8 : 1.1)}
        // height={windowSize[1]}
        viewBox="0 0 1653 1048"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector 1"
          d="M1325 387.965C1348.5 124.215 806.333 54.8813 634.5 46.7146C787.5 16.7146 1376.1 -31.1346 1518.5 28.4654C1696.5 102.965 1687.02 566.948 1549 670.466C1416 770.215 684.269 787.966 787 844.966C905.5 910.715 787.5 1047.47 603 1047.47C445 1047.47 113.333 1005.05 0 956.215C224.333 996.715 725 925.715 547 831.715C334.977 719.747 812.5 709.966 850 709.966C1052.5 702.215 1304.1 622.542 1325 387.965Z"
          fill="url(#paint0_linear_448_6009)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_448_6009"
            x1="867.695"
            y1="-0.7854"
            x2="867.695"
            y2="1054.36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#782AEB" />
            <stop offset="1" stopColor="#FF6259" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroSwirl;
