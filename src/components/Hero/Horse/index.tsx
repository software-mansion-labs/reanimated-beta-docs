import React from "react";
import styles from "./styles.module.css";

import HorseVariantA from "@site/static/img/horse/1.svg";
import HorseVariantB from "@site/static/img/horse/2.svg";
import HorseVariantC from "@site/static/img/horse/3.svg";
import HorseVariantD from "@site/static/img/horse/4.svg";
import HorseVariantE from "@site/static/img/horse/5.svg";
import HorseVariantF from "@site/static/img/horse/6.svg";
import HorseVariantG from "@site/static/img/horse/7.svg";
import HorseVariantH from "@site/static/img/horse/8.svg";
import HorseVariantI from "@site/static/img/horse/9.svg";
import HorseVariantJ from "@site/static/img/horse/10.svg";
import HorseVariantK from "@site/static/img/horse/11.svg";

const HeroHorse = () => {
  return (
    <div className={styles.horse}>
      <div className={styles.horseAnimation}>
        <HorseVariantA className={styles.variantA} />
        <HorseVariantB className={styles.variantB} />
        <HorseVariantC className={styles.variantC} />
        <HorseVariantD className={styles.variantD} />
        <HorseVariantE className={styles.variantE} />
        <HorseVariantF className={styles.variantF} />
        <HorseVariantG className={styles.variantG} />
        <HorseVariantH className={styles.variantH} />
        <HorseVariantI className={styles.variantI} />
        <HorseVariantJ className={styles.variantJ} />
        <HorseVariantK className={styles.variantK} />
      </div>
    </div>
  );
};

export default HeroHorse;
