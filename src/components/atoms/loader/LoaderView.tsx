import { css, keyframes } from '@emotion/react'

import type { CommonComponentProps } from '@/src/components/common';
import Div from '@/src/components/quarks/div/Div';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {}

const spinKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledWrap = styled(Div)`
  ${(props: any) => css`
    border: 12px solid ${props.theme.palette.background.low};
    border-top: 12px solid ${props.theme.palette.primary.main};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spinKeyframes} 1.25s ease-in-out infinite;
    ${props.css || ''}
  `}
`;

const LoaderView: React.FC<ComponentProps> = props => {
  return (
    <StyledWrap {...props} />
  );
}

export default LoaderView;
