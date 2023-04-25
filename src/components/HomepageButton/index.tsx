import React from "react";
import styles from "./styles.module.css";

import ArrowRight from "@site/static/img/arrow-right-hero.svg";
import clsx from "clsx";

export const ButtonStyling = {
  TO_PURPLE: styles.buttonTransparentStyling,
  TO_WHITE: styles.buttonWhiteStyling,
  TO_TRANSPARENT: styles.buttonPurpleStyling,
};

export const BorderStyling = {
  PURPLE: styles.buttonPurpleBorderStyling,
};

const HomepageButton: React.FC<{
  title: string;
  backgroundStyling?: string;
  borderStyling?: string;
}> = ({
  title,
  backgroundStyling = ButtonStyling.TO_TRANSPARENT,
  borderStyling = BorderStyling.PURPLE,
}) => {
  return (
    <div
      className={clsx(styles.homepageButton, backgroundStyling, borderStyling)}
    >
      <p>{title}</p>

      <div className={styles.arrow}>
        <ArrowRight />
      </div>
    </div>
  );
};

export default HomepageButton;
