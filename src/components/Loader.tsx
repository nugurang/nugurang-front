import type { CommonProps, ThemeObject } from '@/src/components/base/common';
import { css, jsx, keyframes } from '@emotion/react'

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledWrapProps extends CommonProps {
  theme: ThemeObject;
}

const spinKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledWrap = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => css`
    border: 12px solid ${props.theme.palette.background.low};
    border-top: 12px solid ${props.theme.palette.primary.main};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spinKeyframes} 1.25s ease-in-out infinite;
    ${props.css || ''}
  `}
`;

const Loader: NextPage<ComponentProps> = props => {
  return (
    <StyledWrap
      className={props.className}
      css={props.css}
    />
  );
}

export default Loader;
