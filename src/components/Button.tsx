import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  css?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  paletteType?: string;
}

interface StyledButtonWrapProps {
  paletteType: string;
}

const StyledButtonWrap = styled.button<StyledButtonWrapProps>`
  ${(props: any) => `
    border: 0px solid #000;
    color: #fff;
    background-color: ${props.theme.palette[props.paletteType].main};
    padding: 10px 20px;
    &:hover {
      background-color: ${props.theme.palette[props.paletteType].dark};
    }
    ${props.css}
  `}
`;

const Button: NextPage<Props> = ({ css, label, onClick, paletteType = 'default' }) => {
  return (
    <StyledButtonWrap
      css={css}
      onClick={onClick}
      paletteType={paletteType}
    >
      { label }
    </StyledButtonWrap>
  );
}

export default Button;
