import { css, cx } from "@emotion/css";
import { baseCss } from "../base";
import React from "react";

const buttonGroupCss = ({ direction }) =>
  cx(
    baseCss,
    css`
      display: inline-block;
      ${direction === "horizontal" &&
      `
        &>button:not(:first-of-type) {
          border-left: 0 solid #000;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &>button:not(:last-of-type) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      `};
      ${direction === "vertical" &&
      `
        &>button {
          display: block;
          width: 100%;
        }
        &>button:not(:first-of-type) {
          border-top: 0 solid #000;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        &>button:not(:last-of-type) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `};
    `,
  );

interface ComponentProps {
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical";
}
const ButtonGroup = ({
  children,
  direction = "horizontal",
}: ComponentProps) => {
  return <div className={buttonGroupCss({ direction })}>{children}</div>;
};

export default ButtonGroup;
