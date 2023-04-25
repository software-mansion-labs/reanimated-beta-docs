import React from "react";
import styles from "./styles.module.css";

import Sun from "@site/static/img/sun.svg";

const HeroSun = () => {
  /* TODO: Implement sunset animation for svg */
  return (
    <div className={styles.sun}>
      <svg
        width="344"
        height="343"
        viewBox="0 0 344 343"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="172.015"
          cy="171.404"
          r="171.386"
          transform="rotate(-52.7839 172.015 171.404)"
          fill="url(#paint0_linear_638_2351)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_638_2351"
            x1="0.628571"
            y1="0.0175629"
            x2="318.282"
            y2="364.671"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD61E" />
            <stop offset="0.0001" stopColor="#FFE04B" />
            <stop offset="1" stopColor="#FF6259" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroSun;
