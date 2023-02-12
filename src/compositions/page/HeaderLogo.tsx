import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import ButtonBase from '@/components/base/ButtonBase';
import VisuallyHidden from '@/components/base/VisuallyHidden';
import Header1 from '@/components/text/Header1';
import Icon from '@/components/graphic/Icon';

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
      <Header1>nu.</Header1>
    </ButtonBase>
  );
}
