import React from "react";
import clsx from "clsx";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import AlgoliaSearchBar from "@site/src/components/AlgoliaSearchBar";
import usePageType from "@site/src/hooks/usePageType";
export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}) {
  const { shown: secondaryMenuShown } = useNavbarSecondaryMenu();
  const { isLanding } = usePageType();

  return (
    <div className="navbar-sidebar">
      {header}
      {!isLanding && <AlgoliaSearchBar />}
      <div
        className={clsx("navbar-sidebar__items", {
          "navbar-sidebar__items--show-secondary": secondaryMenuShown,
        })}
      >
        <div className="navbar-sidebar__item menu">{primaryMenu}</div>
        <div className="navbar-sidebar__item menu">{secondaryMenu}</div>
      </div>
      <div className={styles.sidebarFooter}>
        <a href="https://github.com/software-mansion/react-native-reanimated/tree/main/docs">
          <div className={clsx(styles.sidebarGithubIcon, "header-github")} />
        </a>
      </div>
    </div>
  );
}
