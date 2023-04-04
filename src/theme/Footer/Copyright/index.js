import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function FooterCopyright({ copyright }) {
  return (
    <div className={clsx("footer__copyright", styles.footer)}>
      <p>
        <span className={styles.footer__brand}>
          &copy; Software Mansion {new Date().getFullYear()}.
        </span>
        {` ${copyright}`}
      </p>
    </div>
  );
}
