import { Card } from "@/components/Card";

interface ComponentProps {
  children?: React.ReactNode;
}

const SectionBody = ({ children }: ComponentProps) => {
  const padding = {
    x: 16,
  };
  return <Card padding={padding}>{children}</Card>;
};

export default SectionBody;
