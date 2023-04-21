import React from "react";
import styles from "./styles.module.css";

import UpperCloud from "@site/static/img/cloud-1.svg";
import RightCloud from "@site/static/img/cloud-2.svg";
import LowerCloud from "@site/static/img/cloud-3.svg";

const HeroClouds = () => {
  return (
    <div className={styles.clouds}>
      <div className={styles.upperCloud}>
        <UpperCloud />
      </div>
      <div className={styles.rightCloud}>
        <RightCloud />
      </div>
      <div className={styles.lowerCloud}>
        <LowerCloud />
      </div>
    </div>
  );
};

export default HeroClouds;
