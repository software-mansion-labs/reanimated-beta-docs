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

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
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
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

function AlgoliaSearchBar() {
  return (
    <div className={styles.navbarSearchWrapper}>
      <NavbarSearch className={styles.navbarSearch}>
        <SearchBar />
      </NavbarSearch>
    </div>
  );
}

export default function NavbarContent() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

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
          <NavbarItems items={leftItems} />
          {!searchBarItem && !isMobile && <AlgoliaSearchBar />}
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          {!searchBarItem && isMobile && <AlgoliaSearchBar />}
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        </>
      }
    />
  );
}
