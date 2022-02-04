import type { PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Img from '@/src/components/base/Img';
import type { NextPage } from 'next';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  className?: string;
  css?: string;
  imageUrl?: string;
  palette?: PaletteKeys;
  title?: string;
  onClick?: () => void;
}

interface ComponentProps extends CssProps {}

interface StyledProps extends CssProps {
  isHover?: boolean;
  theme: ThemeObject;
}

const StyledButton = styled(Button)<StyledProps>`
  ${(props: StyledProps) => `
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

const StyledImg = styled(Img)<StyledProps>`
  ${(props: StyledProps) => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`;

const StyledNameDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
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

const Thumbnail: NextPage<ComponentProps> = ({
  className,
  css,
  imageUrl,
  onClick,
  palette,
  title
}) => {
  const [state, setState] = useState({
    isHover: false,
  });
  return (
    <StyledButton
      className={className}
      css={css}
      variant='transparent'
      onClick={onClick}
      isHover={state.isHover}
      onMouseEnter={() => setState((state: any) => ({ ...state, isHover: true }))}
      onMouseLeave={() => setState((state: any) => ({ ...state, isHover: false }))}
    >
      <StyledImg src={imageUrl}/>
      <StyledNameDiv
        palette={palette}
        ellipsis={1}
      >
        {title}
      </StyledNameDiv>
    </StyledButton>
  );
}

export default Thumbnail;
