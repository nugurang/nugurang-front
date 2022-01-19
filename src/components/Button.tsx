import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
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
  `}
`;

const Button: NextPage<Props> = ({ label, onClick, paletteType }) => {
  return (
    <StyledButtonWrap
      onClick={onClick}
      paletteType={paletteType || 'default'}
    >
      { label }
    </StyledButtonWrap>
  );
}

export default Button;
