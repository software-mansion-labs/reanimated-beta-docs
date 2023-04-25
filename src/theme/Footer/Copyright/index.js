import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

import BrandLogo from "@site/static/img/brand-dark.svg";
import BrandLogoDark from "@site/static/img/brand-dark.svg";

export default function FooterCopyright({ copyright }) {
  const location = useLocation();
  const isDocumentation = location.pathname.startsWith("/docs");

  const brandLogo = {
    light: useBaseUrl("/img/brand.svg"),
    dark: useBaseUrl("/img/brand-dark.svg"),
  };

  return (
    <div className={clsx("footer__copyright", styles.footer)}>
      {!isDocumentation && (
        <div className={styles.footer__logo}>
          <ThemedImage sources={brandLogo} />
        </div>
      )}
      <p className={clsx(!isDocumentation && styles.landing)}>
        <span className={styles.footer__brand}>
          &copy; Software Mansion {new Date().getFullYear()}.
        </span>
        {` ${copyright}`}
      </p>
    </div>
  );
}
