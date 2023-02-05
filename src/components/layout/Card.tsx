import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CardProps {
  fullSize?: boolean;
  roundCorner?: boolean;
}
const Card = styled.div<CardProps>`
  background-color: #fff;
  border-radius: ${props => props.roundCorner ? '8px': '0'};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  ${props => props.fullSize ? 'height: 100%;': ''};
  ${props => props.fullSize ? 'width: 100%;': ''};
`;

interface Props {
  children: ReactNode | string;
  fullSize?: boolean;
  roundCorner?: boolean;
}
export default (props: Props) => {
  const {
    children,
    fullSize,
    roundCorner,
  } = props;

  return (
    <Card
      fullSize={fullSize ?? false}
      roundCorner={roundCorner ?? true}
    >
      {children}
    </Card>
  );
}
