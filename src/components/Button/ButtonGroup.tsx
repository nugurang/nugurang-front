import { css, cx } from "@emotion/css";
import { baseCss } from "../css";
import React from "react";

const horizontalButtonGroupCss = () =>
  cx(
    baseCss,
    css`
      display: flex;
      align-items: stretch;
      & > button:not(:first-of-type) {
        border-left: 0 solid #000;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      & > button:not(:last-of-type) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `,
  );

const verticalButtonGroupCss = () =>
  cx(
    baseCss,
    css`
      display: flex;
      flex-direction: column;
      width: fit-content;
      & > button:not(:first-of-type) {
        border-top: 0 solid #000;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
      & > button:not(:last-of-type) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `,
  );

type ButtonGroupDirection = "horizontal" | "vertical";
interface ComponentProps {
  children?: React.ReactNode;
  direction?: ButtonGroupDirection;
}
const ButtonGroup = ({
  children,
  direction = "horizontal",
}: ComponentProps) => {
  return (
    <>
      {direction === "horizontal" && (
        <>
          <div className={horizontalButtonGroupCss()}>{children}</div>
        </>
      )}
      {direction === "vertical" && (
        <>
          <div className={verticalButtonGroupCss()}>{children}</div>
        </>
      )}
    </>
  );
};

export default ButtonGroup;
