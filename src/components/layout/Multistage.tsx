import { ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';

interface MultistageOuterWrapProps {
  gap: string;
  minWidth: string;
  stage: number;
}
const MultistageOuterWrap = styled.div<MultistageOuterWrapProps>`
  ${props => (`
    display: flex;
    flex-wrap: wrap;
    justify-content: spread-evenly;
    gap: ${props.gap};
    width: 100%;
    
    &>* {
      flex-grow: 1;
      ${props.minWidth ? `min-width: ${props.minWidth};` : ''}
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
    <MultistageOuterWrap
      gap={gap ?? '0'}
      minWidth={minWidth ?? `${100 / (stage ?? 1)}%`}
      stage={stage ?? 1}
    >
      {React.Children.toArray(children).map(child => (
        child
      ))}
    </MultistageOuterWrap>
  );
}
