import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import type { BorderRadiusKeys } from '@/src/styles/borderRadius';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Img from '@/src/components/base/Img';
import type { NextPage } from 'next';
import Span from '@/src/components/base/Span';
import styled from '@emotion/styled';

export type IconTypeKeys = 'image'
                         | 'fontAwesomeIcon';

export interface IconObject {
  type?: IconTypeKeys;
  edge?: string;
  src?:  string | IconProp;
  alt?:  string;
}

interface ComponentProps extends CommonProps {
  type?: IconTypeKeys;
  edge?: string;
  src?:  string | IconProp;
  alt?:  string;
}

interface StyledProps extends CommonProps {
  type?: IconTypeKeys;
  edge?: string;
}

const StyledImg = styled(Img)<StyledProps>`
  ${(props: StyledProps) => `
    height: 32px;
    width: 32px;
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'circle']};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledProps>`
  ${(props: StyledProps) => `
    height: 32px;
    width: 32px;
    color: ${props.palette ? props.theme.palette[props.palette].main : props.theme.palette.default.contrast };
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

const Icon: NextPage<ComponentProps> = props => {
  return (
    <>
      {props.src && ((props.type == 'image') || (props.type === undefined)) &&
        <StyledImg
          className={props.className}
          css={props.css}
          edge={props.edge}
          type={props.type}
          src={props.src as string}
        />
      }
      {props.src && (props.type == 'fontAwesomeIcon') &&
        <StyledFontAwesomeIcon
          className={props.className}
          css={props.css}
          palette={props.palette}
          icon={props.src ? props.src as IconProp : ['fas', 'question']}
          edge={props.edge}
          type={props.type}
          fixedWidth
        />
      }
      {!props.src &&
        <StyledAltSpan>{props.alt ?? ''}</StyledAltSpan>
      }
    </>
  );
}

export default Icon;
