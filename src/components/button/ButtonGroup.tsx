import { ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';

type Direction = 'vertical' | 'horizontal';
interface ButtonGroupProps {
  direction: Direction;
  fullWidth: boolean;
}
const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  ${props => (props.fullWidth ? 'width: 100%;' : '')}
  gap: 2px;
  overflow: hidden;
  border-radius: 8px;
  ${props => (props.direction === 'vertical' ? `
    flex-direction: column;
    &>* {
      width: 100%;
      border-radius: 0;
    }
  ` : '')}
  ${props => (props.direction === 'horizontal' ? `
    flex-wrap: wrap;
    &>* {
      flex: 1 1 0px;
      border-radius: 0;
    }
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  direction?: Direction;
  fullWidth?: boolean;
}
export default (props: Props) => {
  const {
    children,
    direction,
    fullWidth,
  } = props;
 
  return (
    <ButtonGroup
      direction={direction ?? 'horizontal'}
      fullWidth={fullWidth ?? false}
    >
      {React.Children.toArray(children).map(child => (
        child
      ))}
    </ButtonGroup>
  );
}
