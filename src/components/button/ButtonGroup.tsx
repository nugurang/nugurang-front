import { ReactNode } from 'react';
import styled from '@emotion/styled';

type Direction = 'vertical' | 'horizontal';
interface ButtonGroupProps {
  direction?: Direction;
}
const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  width: 100%;
  ${props => (props.direction === 'vertical' ? `
    flex-direction: column;
    &>* {
      width: 100%;
    }
    &>*:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 2px;
    }
    &>*:not(:last-child) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  ` : '')}
  ${props => (props.direction === 'horizontal' ? `
    &>* {
      flex: 1 1 0px;
    }
    &>*:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: 2px;
    }
    &>*:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  direction?: Direction;
}
export default (props: Props) => {
  const {
    children,
    direction,
  } = props;
 
  return (
    <ButtonGroup
    direction={direction ?? 'horizontal'}
    >
      {children}
    </ButtonGroup>
  );
}
