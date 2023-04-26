import React from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";
import Clouds from "@site/src/components/Hero/Clouds";
import Stars from "@site/src/components/Hero/Stars";
import Sun from "@site/src/components/Hero/Sun";
import Swirl from "@site/src/components/Hero/Swirl";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

function NavbarBackdrop(props) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx("navbar-sidebar__backdrop", props.className)}
    />
  );
}

const LandingBackground = () => {
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

export default function NavbarLayout({ children }) {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const location = useLocation();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const isDocumentation = location.pathname.startsWith("/docs");
  return (
    <div>
      {!isDocumentation && <LandingBackground />}
      <nav
        ref={navbarRef}
        aria-label={translate({
          id: "theme.NavBar.navAriaLabel",
          message: "Main",
          description: "The ARIA label for the main navigation",
        })}
        className={clsx(
          "navbar",
          isDocumentation && "navbar--fixed-top",
          !isDocumentation && styles.navbarLanding,
          hideOnScroll && [
            styles.navbarHideable,
            !isNavbarVisible && styles.navbarHidden,
          ],
          {
            "navbar--dark": style === "dark",
            "navbar--primary": style === "primary",
            "navbar-sidebar--show": mobileSidebar.shown,
          }
        )}
      >
        {children}
        <NavbarBackdrop onClick={mobileSidebar.toggle} />
        <NavbarMobileSidebar />
      </nav>
    </div>
  );
}
