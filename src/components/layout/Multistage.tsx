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
    flex-basis: ${props.minWidth};

    &>* {
      flex-grow: 1;
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
      minWidth={minWidth ?? '100%'}
      stage={stage ?? 1}
    >
      {React.Children.toArray(children).map(child => (
        <div>
          {child}
        </div>
      ))}
    </MultistageOuterWrap>
  );
}
