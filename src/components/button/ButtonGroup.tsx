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
    &>*:first-child {
      border-radius: 8px 8px 0 0;
    }
    &>*:not(:first-child) {
      margin-top: 2px;
    }
    &>*:last-child {
      border-radius: 0 0 8px 8px;
    }
  ` : '')}
  ${props => (props.direction === 'horizontal' ? `
    &>* {
      flex-grow: 1;
    }
    &>*:first-child {
      border-radius: 8px 0 0 8px;
    }
    &>*:not(:first-child) {
      margin-left: 2px;
    }
    &>*:last-child {
      border-radius: 0 8px 8px 0;
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
    direction={direction ?? 'vertical'}
    >
      {children}
    </ButtonGroup>
  );
}
