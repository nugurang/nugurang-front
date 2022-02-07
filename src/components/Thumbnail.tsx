import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Image from '@/src/components/base/Image';
import type { NextPage } from 'next';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';
import { useState } from 'react';

interface ComponentProps extends CommonProps {
  imageUrl?: string;
  title?: string;
}

interface StyledComponentProps extends CommonStyledProps {
  imageUrl?: string;
  title?: string;
  isHover?: boolean;
}

const StyledButton = styled(Button)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    overflow: hidden;
    height: 128px;
    ${props.theme.screenSizeMediaQuery.gteMobile} {
      height: 192px;
    }
    &:active {
      transform: scale(0.95);
    }
  `}
`;

const StyledImage = styled(Image)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`;

const StyledNameDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 16px;
    font-size: 20px;

    color: #fff;
    border-radius: 0;
    background-color: ${hexToRGB(props.theme.palette.primary.light, 0.9)};
    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    };
  `}
`;

const Thumbnail: NextPage<ComponentProps> = props => {
  const [state, setState] = useState({
    isHover: false,
  });
  return (
    <StyledButton
      className={props.className}
      css={props.css}
      variant='transparent'
      onClick={props.onClick}
      isHover={state.isHover}
      onMouseEnter={() => setState((state: any) => ({ ...state, isHover: true }))}
      onMouseLeave={() => setState((state: any) => ({ ...state, isHover: false }))}
    >
      <StyledImage src={props.imageUrl}/>
      <StyledNameDiv
        palette={props.palette}
        ellipsis={1}
      >
        {props.title}
      </StyledNameDiv>
    </StyledButton>
  );
}

export default Thumbnail;
