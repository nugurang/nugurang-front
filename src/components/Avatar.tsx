import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  alt?: string;
  backgroundColor?: string;
  borderRadius?: string;
  children: React.ReactNode;
  css?: string;
  size?: string;
}

interface StyledAvatarWrapProps {
  backgroundColor: string;
  borderRadius: string;
  css: string;
  size: string;
}

const StyledAvatarWrap = styled.span<StyledAvatarWrapProps>`
  ${(props: any) => `
    display: inline-block;
    background-color: ${props.backgroundColor};
    position: relative;
    border-radius: ${props.theme.borderRadius.icon[props.borderRadius]};
    height: ${props.theme.size.icon[props.size]};
    width: ${props.theme.size.icon[props.size]};
    font-size: ${props.theme.size.font[props.size]};
    overflow: hidden;
    ${props.css}
  `}
`;

const StyledChildrenWrap = styled.span`
  ${(props: any) => `
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `}
`;

const StyledAltWrap = styled.span`
  ${(props: any) => `
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #fff;
  `}
`;

const Avatar: NextPage<Props> = ({
  alt = '',
  backgroundColor = '#888',
  borderRadius = 'circle',
  children,
  css = '',
  size = 'medium',
}) => {
  return (
    <StyledAvatarWrap
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      css={css}
      size={size}
    >
      {children &&
        <StyledChildrenWrap>{children}</StyledChildrenWrap>
      }
      {!children &&
        <StyledAltWrap>{alt}</StyledAltWrap>
      }
    </StyledAvatarWrap>
  );
}

export default Avatar;
