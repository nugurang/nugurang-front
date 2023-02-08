import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';

interface AvatarButtonProps {
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const AvatarButton = styled.button<AvatarButtonProps>`
  position: relative;
  background-image: url("https://cdn-icons-png.flaticon.com/512/149/149071.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
  outline: none;
  padding: 0;
  height: ${props => props.size ?? '100%'};
  width: ${props => props.size ?? '100%'};
  ${props => props.onClick ? 'cursor: pointer;' : ''}
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
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    src,
    alt,
    size,
    onClick,
  } = props;
 
  return (
    <AvatarButton size={size} onClick={onClick}>
      <AvatarAlt src={src}>{alt?.charAt(0) ?? ''}</AvatarAlt>
    </AvatarButton>
  );
}
