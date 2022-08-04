import { Card } from "@/components/Card";
import { Margin, Padding } from "@/components/type";

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
  return (
    <Card backgroundColor={backgroundColor} margin={margin} padding={padding}>
      {children}
    </Card>
  );
};

export default Section;
