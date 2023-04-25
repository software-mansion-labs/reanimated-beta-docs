import React from "react";
import styles from "./styles.module.css";
import ReanimatedFeatureItem from "@site/src/components/ReanimatedFeatures/ReanimatedFeatureItem";

const ReanimatedFeatureList = () => {
  return (
    <div className={styles.featureList}>
      <ReanimatedFeatureItem title="120 FPS">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </ReanimatedFeatureItem>
      <ReanimatedFeatureItem title="Declarative">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </ReanimatedFeatureItem>
      <ReanimatedFeatureItem title="Feature">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </ReanimatedFeatureItem>
    </div>
  );
};

export default ReanimatedFeatureList;
