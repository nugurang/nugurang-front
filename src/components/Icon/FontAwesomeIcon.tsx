import { FontAwesomeIcon as _FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, cx } from "@emotion/css";
import { baseCss } from "../css";
import { CSSProperties } from "react";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-common-types";

const iconCss = ({ height, width }) =>
  cx(
    baseCss,
    css`
      margin: 0 auto;
      ${height ? `height: ${height}px;` : ""}
      ${width ? `width: ${width}px;` : ""}
    `,
  );

export interface FontAwesomeIconProps {
  prefix: IconPrefix;
  name: IconName;
}
interface ComponentProps extends FontAwesomeIconProps {
  css?: CSSProperties;
  height?: number;
  width?: number;
}

export const isFontAwesomeIconProps = (
  object: any,
): object is FontAwesomeIconProps => {
  return !!object && "prefix" in object && "name" in object;
};
const FontAwesomeIcon = ({
  css,
  height,
  prefix,
  name,
  width,
}: ComponentProps) => {
  return (
    <_FontAwesomeIcon
      className={iconCss({ height, width })}
      style={css}
      icon={[prefix, name]}
    />
  );
};

export default FontAwesomeIcon;
