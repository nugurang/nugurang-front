import { Card } from "@/components/Card";
import { defaultPadding } from "@/components/type";

interface ComponentProps {
  children?: React.ReactNode;
}
const SectionBody = ({ children }: ComponentProps) => {
  return <Card padding={defaultPadding}>{children}</Card>;
};

export default SectionBody;
