import React from "react";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import HomepageStartScreen from "@site/src/components/Hero/StartScreen";
import ReanimatedFeatures from "@site/src/components/ReanimatedFeatures";
import ReanimatedSponsors from "@site/src/components/ReanimatedSponsors";

export default function Home(): JSX.Element {
  return (
    <Layout description="Beyond the limitations">
      <div className={styles.landingContainer}>
        <HomepageStartScreen />
        <ReanimatedFeatures />
        <ReanimatedSponsors />
      </div>
    </Layout>
  );
}
