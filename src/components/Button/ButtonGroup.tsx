import { css, cx } from "@emotion/css";
import { baseCss } from "../css";
import React from "react";

const buttonGroupCss = ({ direction }) =>
  cx(
    baseCss,
    css`
      display: flex;
      ${direction === "horizontal" &&
      `
        align-items: stretch;
        &>button {
          flex-grow: 1;
        }
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
        flex-direction: column;
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
