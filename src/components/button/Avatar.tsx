import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';
import ButtonBase from '../base/ButtonBase';

interface AvatarImageProps {
  padding?: string;
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const AvatarImage = styled.div<AvatarImageProps>`
  position: relative;
  background-image: url("https://cdn-icons-png.flaticon.com/512/149/149071.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  height: ${props => props.size ?? '100%'};
  width: ${props => props.size ?? '100%'};
  margin: ${props => props.padding ?? '0'};
`;

interface AvatarAltProps {
  src?: string;
}
const AvatarAlt = styled.span<AvatarAltProps>`
  display: ${props => props.src ? 'none' : 'none'};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  vertical-align: middle;
`;

interface Props {
  src?: string;
  alt?: string;
  padding?: string;
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    src,
    alt,
    padding,
    size,
    onClick,
  } = props;
 
  return (
    <ButtonBase onClick={onClick}>
      <AvatarImage padding={padding} size={size} >
        <AvatarAlt src={src}>{alt?.charAt(0) ?? ''}</AvatarAlt>
      </AvatarImage>
    </ButtonBase>
  );
}
