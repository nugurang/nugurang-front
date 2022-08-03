import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { Card } from "@/components/Card";
import { Margin, Padding } from "@/components/type";

const cardCss = ({ backgroundColor, padding, theme }) =>
  cx(
    baseCss,
    css`
      padding: ${padding
        ? `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`
        : "0"};
      background-color: ${backgroundColor || theme.colors.highContrast.high};
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  fixedWidth?: boolean;
  fixedWidthThresholds?: number[];
  margin?: Margin;
  maxWidth?: number;
  minWidth?: number;
  padding?: Padding;
  width?: number;
}
const Section = ({
  backgroundColor,
  children,
  margin,
  padding,
}: ComponentProps) => {
  const theme = useTheme();

  return (
    <Card backgroundColor={backgroundColor} margin={margin} padding={padding}>
      {children}
    </Card>
  );
};

export default Section;
