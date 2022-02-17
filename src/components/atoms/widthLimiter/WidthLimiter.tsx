import type { CommonComponentProps } from '@/src/components/common';
import WidthLimiterView from '@/src/components/atoms/widthLimiter/WidthLimiterView';

interface ComponentProps extends CommonComponentProps {
  maxWidth?: number;
}

const WidthLimiter: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <WidthLimiterView {...viewProps} />
  );

}

export default WidthLimiter;
