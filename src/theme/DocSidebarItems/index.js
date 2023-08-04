import React, { memo } from "react";
import { DocSidebarItemsExpandedStateProvider } from "@docusaurus/theme-common/internal";
import DocSidebarItem from "@theme/DocSidebarItem";
import SidebarLabel from "@site/src/components/SidebarLabel";
import styles from "./styles.module.css";

const EXPERIMENTAL_APIs = ["Overview"]; // this will break if there's more than one "Overview" item
const NEW_APIS = ["dispatchCommand"];
// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
function DocSidebarItems({ items, ...props }) {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item, index) => (
        <div className={styles.wrapper}>
          <DocSidebarItem key={index} item={item} index={index} {...props} />
          {EXPERIMENTAL_APIs.includes(item.label) && (
            <SidebarLabel key={`${index}-label`} type="experimental" />
          )}
          {NEW_APIS.includes(item.label) && (
            <SidebarLabel key={`${index}-label`} type="new" />
          )}
        </div>
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
}
// Optimize sidebar at each "level"
export default memo(DocSidebarItems);
