import { ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';

interface GridOuterWrapProps {
  gap: string;
  minWidth?: string;
  stage: number;
}
const GridOuterWrap = styled.ul<GridOuterWrapProps>`
  ${props => (`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: -${props.gap};
    margin-left: -${props.gap};

    &>* {
      flex-grow: 1;
      flex-shrink: 1;
      display: inline-block;
      width: calc(${100 / props.stage}% - ${props.gap});
      min-width: min(${props.minWidth ?? '100%'}, 100%);
      margin-top: ${props.gap};
      margin-left: ${props.gap};
    }
  `)}
`;

interface Props {
  children: ReactNode | string;
  gap?: string;
  minWidth?: string;
  stage?: number;
}
export default (props: Props) => {
  const {
    children,
    gap,
    minWidth,
    stage,
  } = props;

  return (
    <GridOuterWrap
      gap={gap ?? '4px'}
      stage={stage ?? 1}
      minWidth={minWidth}
    >
      {React.Children.toArray(children).map(child => (
        child
      ))}
    </GridOuterWrap>
  );
}
