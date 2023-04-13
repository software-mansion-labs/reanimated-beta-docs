import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useCopyToClipboard } from "usehooks-ts";
import clsx from "clsx";

import Copy from "@site/static/img/copy.svg";
import CopyDark from "@site/static/img/copy-dark.svg";

import Reset from "@site/static/img/reset.svg";
import ResetDark from "@site/static/img/reset-dark.svg";
import { useColorMode } from "@docusaurus/theme-common";
import { reset } from "react-native-svg/lib/typescript/lib/Matrix2D";

interface Props {
  src: string;
  component: React.ReactNode;
  showCode?: boolean; // whether to show code by default
  larger?: boolean; // should the view be enlarged?
}

export default function InteractiveExample({
  src,
  component,
  showCode = false,
  larger = false,
}: Props) {
  const [_, copy] = useCopyToClipboard();
  const [key, setKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(!showCode);
  const [copied, setCopied] = React.useState(false);
  const [resetClicked, setResetClicked] = React.useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(() => false), 1000);
    return () => clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    const timeout = setTimeout(() => setResetClicked(() => false), 1000);
    return () => clearTimeout(timeout);
  }, [resetClicked]);

  const resetExample = () => {
    setKey(key + 1);
    setCopied(false);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <div
          className={`${styles.container} ${larger && styles.largerContainer} 
          ${!showPreview ? styles.code : ""}`}
          data-ispreview={showPreview}
        >
          <div
            className={clsx(
              styles.buttonsContainer,
              styles.upperButtonsContainer
            )}
          >
            <div className={styles.actionButtonsContainer}>
              <button
                className={clsx(
                  styles.actionButton,
                  showPreview ? styles.actionButtonActive : ""
                )}
                onClick={() => setShowPreview(true)}
              >
                Preview
              </button>
              <button
                className={clsx(
                  styles.actionButton,
                  !showPreview ? styles.actionButtonActive : ""
                )}
                onClick={() => setShowPreview(false)}
              >
                Code
              </button>
            </div>
            <div
              onClick={() => {
                if (!copied) {
                  copy(src);
                  setCopied(true);
                }
              }}
              className={clsx(styles.actionIcon, copied && styles.iconClicked)}
            >
              {colorMode === "light" ? <Copy /> : <CopyDark />}
            </div>
          </div>
          <div className={styles.previewContainer}>
            {showPreview ? (
              <>
                <React.Fragment key={key}>{component}</React.Fragment>

                <div
                  className={clsx(
                    styles.buttonsContainer,
                    styles.lowerButtonsContainer
                  )}
                >
                  <div
                    onClick={() => {
                      if (!resetClicked) {
                        resetExample();
                        setResetClicked(true);
                      }
                    }}
                    className={clsx(
                      styles.actionIcon,
                      resetClicked && styles.iconClicked
                    )}
                  >
                    {colorMode === "light" ? <Reset /> : <ResetDark />}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.interactiveCodeBlock}>
                <CodeBlock language="jsx">{src}</CodeBlock>
              </div>
            )}
          </div>
        </div>
      )}
    </BrowserOnly>
  );
}
