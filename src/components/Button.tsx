import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  css?: string;
  href?: string | object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  paletteType?: string;
}

interface StyledButtonWrapProps {
  paletteType: string;
  css: string;
}

const StyledButtonWrap = styled.button<StyledButtonWrapProps>`
  ${(props: any) => `
    border: 0px solid #000;
    border-radius: 4px;
    color: ${props.theme.palette[props.paletteType].text};
    background-color: ${props.theme.palette[props.paletteType].main};
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${props.theme.palette[props.paletteType].dark};
    }
    ${props.css}
  `}
`;

const Button: NextPage<Props> = ({
  children,
  css = '',
  onClick,
  paletteType = 'default'
}) => {
  return (
    <StyledButtonWrap
      css={css}
      onClick={onClick}
      paletteType={paletteType}
    >
      { children }
    </StyledButtonWrap>
  );
}

export default Button;
