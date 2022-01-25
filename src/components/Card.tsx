import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledDivContainer = styled.div`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const Card: NextPage = ({
  children,
}) => {
  return (
    <StyledDivContainer>
      { children }
    </StyledDivContainer>
  );
}

export default Card;
