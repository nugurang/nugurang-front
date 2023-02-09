import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ListItemProps {
  fullWidth?: boolean;
}
const ListItem = styled.li<ListItemProps>`
  display: block;
  width: 100%;
`;

interface Props {
  children: ReactNode | string;
}
export default (props: Props) => {
  const {
    children,
  } = props;
 
  return (
    <ListItem>
      {children}
    </ListItem>
  );
}
