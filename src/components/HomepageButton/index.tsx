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
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  backgroundStyling?: string;
  borderStyling?: string;
  enlarged?: boolean;
}> = ({
  title,
  href,
  target = "_self",
  backgroundStyling = ButtonStyling.TO_TRANSPARENT,
  borderStyling = BorderStyling.PURPLE,
  enlarged = false,
}) => {
  return (
    <div
      className={clsx(styles.homepageButton, backgroundStyling, borderStyling)}
      onClick={() => {
        /* Unfortunately, CSS behaves strangely when the whole div is inside the <a> tag.
         * For example, it doesn't allow to disable text-decoration for the <p> tag.
         * Hence, it's possible to achieve similar result with `windows.open()`.
         */
        window.open(href, target);
      }}
    >
      <p>{title}</p>

      <div className={styles.arrow}>
        <ArrowRight />
      </div>
    </div>
  );
};

export default HomepageButton;
