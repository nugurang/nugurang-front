import type { CommonComponentProps } from '@/components/common';
import GridView from '@/components/atoms/grid/GridView';
import useComponentSize from '@/hooks/useComponentSize';
import { useRef } from 'react';

interface ComponentProps extends CommonComponentProps {
  column: GridColumnObject;
  gap?: number;
}

const Grid: React.FC<ComponentProps> = props => {
  const componentRef = useRef();
  const size = useComponentSize(componentRef);

  const viewProps = {
    ...props,
    column: props.column,
    gap: props.gap,
    size
  };

  return (
    <div ref={componentRef as any}>
      <GridView {...viewProps} />
    </div>
  );

}

export default Grid;
