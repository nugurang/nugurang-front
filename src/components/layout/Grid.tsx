import { ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';

interface GridOuterWrapProps {
  gap: string;
  stage: number;
}
const GridOuterWrap = styled.div<GridOuterWrapProps>`
  ${props => (`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: -${props.gap};
    margin-left: -${props.gap};

    &>* {
      display: inline-block;
      width: calc(${100 / props.stage}% - ${props.gap});
      margin-top: ${props.gap};
      margin-left: ${props.gap};
    }
  `)}
`;

interface Props {
  children: ReactNode | string;
  gap?: string;
  stage?: number;
}
export default (props: Props) => {
  const {
    children,
    gap,
    stage,
  } = props;

  return (
    <GridOuterWrap
      gap={gap ?? '0'}
      stage={stage ?? 1}
    >
      {React.Children.toArray(children).map(child => (
        child
      ))}
    </GridOuterWrap>
  );
}
