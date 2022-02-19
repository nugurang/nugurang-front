import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const StyledButton = styled.button<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    
    position: relative;
    padding: 10px 20px;
    overflow: hidden;
    cursor: pointer;
    text-align: unset;

    &:hover {
      ${props.variant == 'filled' ? `
        background-color: ${props.theme.palette[props.palette || 'default'].dark};
      ` : ''}
    }
    ${props.selected ? `
      background-color: ${props.theme.palette[props.palette || 'default'].dark};
    ` : ''}

    &:active {
      transform: scale(0.9);
    }
    
    ${props.css}
  `}
`;

const StyledHoverEffect = styled.div<ViewProps>`
  ${(props: any) => `
    display: ${props.palette ? 'none' : 'block'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
    background-color: #0000;
    &:hover {
      ${props.variant != 'filled' ? `
        background-color: #0002;
      ` : ''}
    }
    ${(props.selected && (props.variant != 'filled')) ? `
      background-color: #0002;
    ` : ''}

    -webkit-transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  `}
`;

const ButtonView: React.FC<ViewProps> = props => {

  const viewProps = {
    ...props,
    variant: props.variant ?? 'filled'
  }

  return (
    <StyledButton
      {...viewProps}
    >
      { props.children }
      <StyledHoverEffect />
    </StyledButton>
  );
};

export default ButtonView;
