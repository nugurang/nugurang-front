import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import ButtonBase from '@/components/base/ButtonBase';

const HeaderLogoSimplified = styled.h1`
  display: none;
  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    font-weight: bold;
  }
`;
const HeaderLogo = styled.h1`
  display: none;
  @media (min-width: 768px) {
    display: block;
    font-size: 24px;
    font-weight: bold;
  }
`;

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    onClick,
  } = props;

  return (
    <ButtonBase onClick={onClick}>
      <HeaderLogoSimplified>
        nu.
      </HeaderLogoSimplified>
      <HeaderLogo>
        nugurang
      </HeaderLogo>
    </ButtonBase>
  );
}
