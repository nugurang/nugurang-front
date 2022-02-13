import type { BorderRadiusKeys } from '@/src/styles/props/borderRadius';
import type { CommonComponentProps } from '@/src/components/common';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from '@/src/components/atoms/image/Image';
import Span from '@/src/components/quarks/span/Span';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  type?: IconTypeKeys;
  edge?: string;
  src?:  string | IconProp;
  alt?:  string;
}

const StyledImage = styled(Image)<ViewProps>`
  ${(props: any) => `
    height: 32px;
    width: 32px;
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'circle']};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<ViewProps>`
  ${(props: any) => `
    height: 32px;
    width: 32px;
    color: ${props.palette ? props.theme.palette[props.palette].main : props.theme.palette.default.contrast };
    border-radius: ${props.theme.borderRadius[props.edge as BorderRadiusKeys || 'square']};
    overflow: hidden;
    ${props.css || ''}
  `}
`;

const StyledAltSpan = styled(Span)`
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

const IconView: React.FC<ViewProps> = props => {
  if (props.src) {
    if (props.type == 'fontAwesomeIcon') {
      const fontAwesomeIconProps = {
        ...props,
        icon: props.src as IconProp
      }
      return (
        <StyledFontAwesomeIcon {...fontAwesomeIconProps} />
      );
    }
    else {
      const imageProps = {
        ...props,
        src: props.src as string
      }
      return (
        <StyledImage {...imageProps} />
      );
    }
  }
  else {
    return (
      <StyledAltSpan>{props.alt ?? ''}</StyledAltSpan>
    );
  }
}

export default IconView;
