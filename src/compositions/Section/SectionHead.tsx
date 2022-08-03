import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { Card } from "@/components/Card";
import { makePadding } from "@/components/type";

const titleCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      font-size: 20px;
      font-weight: 700;
    `,
  );

interface ComponentProps {
  children?: React.ReactNode;
  title?: string;
}
const SectionHead = ({ children, title }: ComponentProps) => {
  const theme = useTheme();

  return (
    <Card padding={{ all: 8 }}>
      <span className={titleCss({ theme })}>{title}</span>
      {children}
    </Card>
  );
};

export default SectionHead;
