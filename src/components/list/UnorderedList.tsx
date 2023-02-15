import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface UnorderedListProps {
  fullWidth?: boolean;
  gap?: string;
}
const UnorderedList = styled.ul<UnorderedListProps>`
  ${props => (`
    &>*:not(:first-child) {
      margin-top: ${props.gap ?? '0'};
    }`)
  }
`;

interface Props {
  children: ReactNode | string;
  gap?: string;
}
export default (props: Props) => {
  const {
    children,
    gap,
  } = props;
 
  return (
    <UnorderedList
      gap={gap}
    >
      {children}
    </UnorderedList>
  );
}
