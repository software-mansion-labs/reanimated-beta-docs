import React from "react";
import styles from "./styles.module.css";

import ArrowRight from "@site/static/img/arrow-right-hero.svg";
import ArrowRightDark from "@site/static/img/arrow-right.svg";

const GetStartedButton = () => {
  return (
    <div className={styles.getStartedButton}>
      <p>Get started</p>

      <div className={styles.arrow}>
        <ArrowRight />
      </div>
    </div>
  );
};

export default GetStartedButton;
