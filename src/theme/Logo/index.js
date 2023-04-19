import React from "react";
import LogoStyling from "@site/src/theme/Logo/LogoStyling";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

export default function LogoWrapper(props) {
  const titleImages = {
    light: useBaseUrl("/img/title.svg"),
    dark: useBaseUrl("/img/title-dark.svg"),
  };

  return (
    <div className={styles.navbar__logo__wrapper}>
      <LogoStyling
        titleImages={titleImages}
        className={styles.navbar__logo}
        titleClassName={styles.navbar__title}
      />
    </div>
  );
}
