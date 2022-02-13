import type { CommonComponentProps } from '@/src/components/common';
import GridView from '@/src/components/atoms/grid/GridView';
import useComponentSize from '@/src/hooks/useComponentSize';
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
