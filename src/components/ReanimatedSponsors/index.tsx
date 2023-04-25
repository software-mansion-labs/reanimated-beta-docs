import React from "react";
import styles from "./styles.module.css";

import ExpoLogo from "@site/static/img/expo.svg";
import ShopifyLogo from "@site/static/img/shopify.svg";

const ReanimatedSponsors = () => {
  return (
    <div className={styles.sponsors}>
      <div className={styles.sponsorsBackground}></div>
      <div className={styles.sponsorsWrapper}>
        <div className={styles.sponsorsLabel}>
          <h3>Sponsors</h3>
          <p>
            Thanks to our Sponsors we can still develop our library and make the
            React Native world a better place!
          </p>
        </div>
        <div className={styles.sponsorsBrands}>
          <ExpoLogo className={styles.sponsorsBrand} />
          <ShopifyLogo />
        </div>
      </div>
    </div>
  );
};

export default ReanimatedSponsors;
