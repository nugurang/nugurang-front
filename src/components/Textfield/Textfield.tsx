import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../base";
import {
  ColorVariant,
  FillingVariant,
  defaultColorVariant,
  defaultFillingVariant,
} from "@/styles/CssType";

const textfieldCss = ({ colorVariant, fillingVariant, theme }) =>
  cx(
    baseCss,
    css`
      padding: 8px;

      color: ${theme.colors[colorVariant].main};
      background-color: ${theme.colors[colorVariant].main};
      border: 2px solid ${theme.colors[colorVariant].main};
      outline-color: ${theme.colors[colorVariant].main};
      &:hover,
      &:focus {
        background-color: ${theme.colors[colorVariant].high};
        border: 2px solid ${theme.colors[colorVariant].high};
        outline-color: ${theme.colors[colorVariant].high};
      }

      ${fillingVariant === "contained" &&
      `
        color: ${theme.colors.highContrast.main};
        outline-color: transparent;
        &:hover, &:focus {
          color: ${theme.colors.highContrast.high};
          border: 2px solid transparent;
        }
      `}
      ${fillingVariant === "outlined" &&
      `
        background-color: transparent;
        &:hover, &:focus {
          background-color: transparent;
        }
      `}
      ${fillingVariant === "transparent" &&
      `
        background-color: transparent;
        outline-color: transparent;
        &:hover, &:focus {
          background-color: transparent;
          border: 2px solid transparent;
          outline-color: transparent;
        }
      `}
    `,
  );

interface ComponentProps {
  onChange?: (value: string) => void;
  colorVariant?: ColorVariant;
  fillingVariant?: FillingVariant;
}
const Textfield = ({
  colorVariant = defaultColorVariant,
  fillingVariant = defaultFillingVariant,
  onChange,
}: ComponentProps) => {
  const theme = useTheme();
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.value);
  };

  return (
    <input
      className={textfieldCss({ colorVariant, fillingVariant, theme })}
      type="text"
      onChange={onChangeInput}></input>
  );
};

export default Textfield;
