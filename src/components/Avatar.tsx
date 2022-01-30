import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import styled from 'styled-components';

type SizeKeys = 'small'
              | 'medium'
              | 'large';

const iconSize = {
  small: '24px',
  medium: '32px',
  large: '40px',
};
const fontSize = {
  small: '12px',
  medium: '16px',
  large: '20px',
};

interface CssProps {
  backgroundColor?: string;
  className?: string;
  css?: string;
  size?: SizeKeys;
}

interface ComponentProps extends CssProps {
  alt?: string;
  children?: React.ReactNode;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledAvatarWrap = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    background-color: ${props.backgroundColor || '#888'};
    position: relative;
    border-radius: ${props.theme.borderRadius.default};
    height: ${iconSize[`${props.size || 'medium'}`]};
    width: ${iconSize[`${props.size || 'medium'}`]};
    font-size: ${fontSize[`${props.size || 'medium'}`]};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledAvatarChildrenWrap = styled.span`
  ${(props: any) => `
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  `}
`;

const StyledAvatarAltWrap = styled.span`
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

const Avatar: NextPage<ComponentProps> = ({
  alt,
  backgroundColor,
  children,
  className,
  css,
  size,
}) => {
  return (
    <StyledAvatarWrap
      backgroundColor={backgroundColor}
      className={className}
      css={css}
      size={size}
    >
      {children &&
        <StyledAvatarChildrenWrap>{children}</StyledAvatarChildrenWrap>
      }
      {!children &&
        <StyledAvatarAltWrap>{alt || ''}</StyledAvatarAltWrap>
      }
    </StyledAvatarWrap>
  );
}

export default Avatar;
