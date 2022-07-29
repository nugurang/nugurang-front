import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../base";

const containerCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      background-color: ${theme.colors.primary};
      color: cornflowerblue;
      border: 1px solid lightgreen;
      border-right: none;
      border-bottom: none;
      box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
      transition: all 0.1s linear;
      padding: 1rem 0.5rem;

      &:active {
        background-color: blue;
      }
    `,
  );

const Container = ({ children }) => {
  const theme = useTheme();
  return <div className={containerCss({ theme })}>{children}</div>;
};

export default Container;
