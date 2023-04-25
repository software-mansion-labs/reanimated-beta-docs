import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";

export default function FooterLayout({ style, links, logo, copyright }) {
  const location = useLocation();
  const isDocumentation = location.pathname.startsWith("/docs");

  return (
    <footer
      className={clsx("footer", !isDocumentation && styles.footerTransparent, {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
