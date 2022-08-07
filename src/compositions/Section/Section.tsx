import { useTheme } from "@emotion/react";
import { css, cx } from "@emotion/css";
import { baseCss } from "@/components/css";
import { Card } from "@/components/Card";
import { Theme } from "@/components/theme";
import { FillingVariant, Margin, Padding } from "@/components/type";

const innerWrapCss = () =>
  cx(
    baseCss,
    css`
      padding: 16px 0;
      & > * {
        margin-top: 16px;
      }
      & > *:first-child {
        margin-top: 0;
      }
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  fillingVariant?: FillingVariant;
  margin?: Margin;
  padding?: Padding;
}
const Section = ({
  backgroundColor,
  children,
  fillingVariant,
  margin,
  padding,
}: ComponentProps) => {
  const theme = useTheme() as Theme;
  return (
    <Card
      backgroundColor={backgroundColor || theme.colors.highContrast.high}
      fillingVariant={fillingVariant}
      margin={margin}
      padding={padding}>
      <div className={innerWrapCss()}>{children}</div>
    </Card>
  );
};

export default Section;
