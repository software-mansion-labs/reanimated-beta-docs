import React from "react";
import styles from "./styles.module.css";
import SelectedLabel from "@site/src/components/Hero/SelectedLabel";
import GetStarted from "@site/src/components/HomepageButton";
import Clouds from "@site/src/components/Hero/Clouds";
import Swirl from "@site/src/components/Hero/Swirl";
import Sun from "@site/src/components/Hero/Sun";
import Stars from "@site/src/components/Hero/Stars";
import Horse from "@site/src/components/Hero/Horse";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const Background = () => {
  return (
    <div className={styles.heroBackground}>
      <Clouds />
      <Stars />

      {
        /* Swirl uses viewport behind the hood to calculate appropriate with.
         * Thus, access to the viewport is required to render the Swirl component.
         */
        ExecutionEnvironment.canUseViewport && (
          <>
            <Sun />
            <Swirl />
          </>
        )
      }
    </div>
  );
};

const StartScreen = () => {
  return (
    <section className={styles.hero}>
      <Background />

      <div className={styles.foregroundLabel}>
        <div className={styles.heading}>
          <div className={styles.upperHeading}>
            <h1 className={styles.headingLabel}>
              React Native <SelectedLabel>Reanimated</SelectedLabel>
            </h1>
            <h2 className={styles.subheadingLabel}>
              Where declarative animations meet native performance at 120 fps
            </h2>
          </div>
          <div className={styles.lowerHeading}>
            <Horse />
            <GetStarted title="Get started" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartScreen;
