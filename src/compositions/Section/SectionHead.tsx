import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { Card } from "@/components/Card";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
  isFontAwesomeIconProps,
} from "@/components/Icon";

const titleCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      font-size: 20px;
      font-weight: 700;
    `,
  );

const iconWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      font-size: 20px;
      margin-right: 8px;
    `,
  );

interface ComponentProps {
  children?: React.ReactNode;
  icon?: FontAwesomeIconProps;
  title?: string;
}
const SectionHead = ({ children, icon, title }: ComponentProps) => {
  const theme = useTheme();

  return (
    <Card padding={{ all: 16 }}>
      {isFontAwesomeIconProps(icon) && (
        <span className={iconWrapCss({ theme })}>
          <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
        </span>
      )}
      <span className={titleCss({ theme })}>{title}</span>
      {children}
    </Card>
  );
};

export default SectionHead;
