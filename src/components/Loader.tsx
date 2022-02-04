import { css, jsx, keyframes } from '@emotion/react'

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/components/base/common';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {}

interface StyledWrapProps extends CssProps {
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

const Loader: NextPage<ComponentProps> = ({
  className,
  css,
}) => {
  return (
    <StyledWrap
      className={className}
      css={css}
    />
  );
}

export default Loader;
