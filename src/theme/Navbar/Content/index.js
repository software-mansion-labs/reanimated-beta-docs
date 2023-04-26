import React from "react";
import {
  useThemeConfig,
  ErrorCauseBoundary,
  useWindowSize,
} from "@docusaurus/theme-common";
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items, isDocumentation = true }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem
            className={clsx(!isDocumentation && styles.navbarItemLanding)}
            {...item}
          />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({ left, right, isDocumentation }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div
        className={clsx(
          "navbar__items navbar__items--right",
          !isDocumentation && styles.navbarItemsLanding
        )}
      >
        {right}
      </div>
    </div>
  );
}

function AlgoliaSearchBar() {
  return (
    <NavbarSearch className={styles.navbarSearch}>
      <SearchBar />
    </NavbarSearch>
  );
}

export default function NavbarContent() {
  const windowSize = useWindowSize();
  const location = useLocation();
  const isMobile = windowSize === "mobile";

  const isDocumentation = location.pathname.startsWith("/docs");
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === "search");
  return (
    <NavbarContentLayout
      left={
        <>
          <div className={styles.logoWrapper}>
            <NavbarLogo />
          </div>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          <NavbarItems items={leftItems} />
          {!searchBarItem && !isMobile && isDocumentation && (
            <AlgoliaSearchBar />
          )}
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} isDocumentation={isDocumentation} />
          {!searchBarItem && isMobile && isDocumentation && (
            <AlgoliaSearchBar />
          )}
          {!mobileSidebar.disabled && isDocumentation && (
            <NavbarMobileSidebarToggle />
          )}
        </>
      }
      isDocumentation={isDocumentation}
    />
  );
}
