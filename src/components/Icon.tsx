import type { BorderRadiusKeys } from '@/src/styles/borderRadius';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from '@/src/components/Image';
import type { NextPage } from 'next';
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ThemeObject } from '@/src/styles/theme';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

type VariantKeys = 'image'
                 | 'fontAwesomeIcon';

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
  variant?: VariantKeys;
}

interface ComponentProps extends CssProps {
  src? :string | IconProp;
  alt?: string;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.span<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    background-color: ${props.backgroundColor || '#0000'};
    position: relative;

    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'circle']};
    ${props.variant == 'fontAwesomeIcon' && `
      border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'square']};
    `}

    height: ${iconSize[`${props.size || 'medium'}`]};
    width: ${iconSize[`${props.size || 'medium'}`]};
    font-size: ${fontSize[`${props.size || 'medium'}`]};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledImage = styled(Image)<StyledProps>`
  ${(props: StyledProps) => `
    height: 100%;
    width: 100%;
  `}
`;

const StyledAltWrap = styled.span<StyledProps>`
  ${(props: StyledProps) => `
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

const StyledReactFontAwesomeIconp = styled(ReactFontAwesomeIcon)<StyledProps>`
  ${(props: StyledProps) => `
    height: 100%;
    width: 100%;
  `}
`;

const Icon: NextPage<ComponentProps> = ({
  alt,
  backgroundColor,
  className,
  css,
  edge,
  size,
  src,
  variant,
}) => {
  return (
    <StyledWrap
      backgroundColor={backgroundColor}
      className={className}
      css={css}
      edge={edge}
      size={size}
      variant={variant}
    >
      {src && ((variant == 'image') || (variant === undefined)) &&
        <StyledImage
          src={src}
        />
      }
      {src && (variant == 'fontAwesomeIcon') &&
        <StyledReactFontAwesomeIconp
          icon={src || ['fas', 'question']}
          fixedWidth
        />
      }
      {!src &&
        <StyledAltWrap>{alt || ''}</StyledAltWrap>
      }
    </StyledWrap>
  );
}

export default Icon;
