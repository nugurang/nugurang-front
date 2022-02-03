import type { BorderRadiusKeys } from '@/src/styles/borderRadius';
import Image from '@/src/components/Image';
import type { NextPage } from 'next';
import type { ThemeObject } from '@/src/styles/theme';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

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
  edge?: string;
  className?: string;
  css?: string;
  size?: SizeKeys;
}

interface ComponentProps extends CssProps {
  src? :string;
  alt?: string;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledAvatarWrap = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    background-color: ${props.backgroundColor || '#888'};
    position: relative;
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'circle']};
    height: ${iconSize[`${props.size || 'medium'}`]};
    width: ${iconSize[`${props.size || 'medium'}`]};
    font-size: ${fontSize[`${props.size || 'medium'}`]};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledAvatarImage = styled(Image)`
  ${(props: any) => `
    height: 100%;
    width: 100%;
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
    ${fontFamily}
  `}
`;

const Avatar: NextPage<ComponentProps> = ({
  alt,
  backgroundColor,
  className,
  css,
  edge,
  size,
  src,
}) => {
  return (
    <StyledAvatarWrap
      backgroundColor={backgroundColor}
      className={className}
      css={css}
      edge={edge}
      size={size}
    >
      {src &&
        <StyledAvatarImage
          src={src}
        />
      }
      {!src &&
        <StyledAvatarAltWrap>{alt || ''}</StyledAvatarAltWrap>
      }
    </StyledAvatarWrap>
  );
}

export default Avatar;
