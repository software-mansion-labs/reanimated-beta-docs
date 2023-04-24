import React from "react";
import styles from "./styles.module.css";
import horse from "@site/static/img/horse.gif";

const HeroHorse = () => {
  return (
    <div className={styles.horse}>
      <img src={horse} alt="" />
    </div>
  );
};

export default HeroHorse;
