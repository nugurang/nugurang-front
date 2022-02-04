import type { PaletteKeys, ThemeObject } from '@/src/styles/theme';

import type { BorderRadiusKeys } from '@/src/styles/borderRadius';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Img from '@/src/components/base/Img';
import type { NextPage } from 'next';
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Span from '@/src/components/base/Span';
import styled from '@emotion/styled';

type TypeKeys = 'image'
              | 'fontAwesomeIcon';

interface CssProps {
  backgroundColor?: string;
  edge?: string;
  className?: string;
  css?: string;
  palette?: PaletteKeys;
  type?: TypeKeys;
}

interface ComponentProps extends CssProps {
  src? :string | IconProp;
  alt?: string;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledImg = styled(Img)<StyledProps>`
  ${(props: StyledProps) => `
    ${props.css || ''}
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'circle']};
    overflow: hidden;
  `}
`;

const StyledReactFontAwesomeIcon = styled(ReactFontAwesomeIcon)<StyledProps>`
  ${(props: StyledProps) => `
    color: ${props.theme.palette[props.palette || 'default'].main};
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'square']};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledAltSpan = styled(Span)<StyledProps>`
  ${(props: StyledProps) => `
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #fff;
  `}
`;

const Icon: NextPage<ComponentProps> = ({
  alt,
  className,
  css,
  edge,
  palette,
  src,
  type,
}) => {
  return (
    <>
      {src && ((type == 'image') || (type === undefined)) &&
        <StyledImg
          className={className}
          css={css}
          edge={edge}
          type={type}
          src={src as string}
        />
      }
      {src && (type == 'fontAwesomeIcon') &&
        <StyledReactFontAwesomeIcon
          className={className}
          css={css}
          palette={palette}
          icon={src || ['fas', 'question']}
          edge={edge}
          type={type}
          fixedWidth
        />
      }
      {!src &&
        <StyledAltSpan>{alt || ''}</StyledAltSpan>
      }
    </>
  );
}

export default Icon;
