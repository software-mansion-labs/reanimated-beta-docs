import React from "react";
import styles from "./styles.module.css";
import SelectedLabel from "@site/src/components/Hero/SelectedLabel";
import HomepageButton from "@site/src/components/HomepageButton";
import Horse from "@site/src/components/Hero/Horse";
import { useAnnouncementBar } from "@docusaurus/theme-common/internal";

const StartScreen = () => {
  const { isActive } = useAnnouncementBar();
  return (
    <section className={styles.hero} data-announcement-bar={isActive}>
      <div className={styles.foregroundLabel}>
        <div className={styles.heading}>
          <div className={styles.upperHeading}>
            <h1 className={styles.headingLabel}>
              <span>React Native</span>
              <SelectedLabel>Reanimated</SelectedLabel>
            </h1>
            <h2 className={styles.subheadingLabel}>
              Where declarative animations meet native performance at 120 fps
            </h2>
          </div>
          <div className={styles.lowerHeading}>
            <Horse />
            <HomepageButton
              href="/docs/fundamentals/getting-started"
              title="Get started"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartScreen;
