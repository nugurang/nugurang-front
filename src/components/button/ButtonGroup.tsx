import { ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';

type Direction = 'vertical' | 'horizontal';
interface ButtonGroupProps {
  direction: Direction;
  fullWidth: boolean;
  maxWidth?: string;
}
const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  ${props => (props.fullWidth ? 'width: 100%;' : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  gap: 2px;
  width: 100%;
  margin: auto;

  overflow: hidden;
  border-radius: 8px;
  ${props => (props.direction === 'vertical' ? `
    flex-direction: column;
    &>* {
      border-radius: 0;
    }
  ` : '')}
  ${props => (props.direction === 'horizontal' ? `
    flex-wrap: wrap;
    &>* {
      flex: 1 1 0;
      border-radius: 0;
    }
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  direction?: Direction;
  fullWidth?: boolean;
  maxWidthPerButton?: string;
}
export default (props: Props) => {
  const {
    children,
    direction,
    fullWidth,
    maxWidthPerButton,
  } = props;
 
  return (
    <ButtonGroup
      direction={direction ?? 'horizontal'}
      fullWidth={fullWidth ?? false}
      maxWidth={`calc(${React.Children.toArray(children).length} * ${maxWidthPerButton ?? '150px'})`}
    >
      {React.Children.toArray(children).map(child => (
        child
      ))}
    </ButtonGroup>
  );
}
