import styled from '@emotion/styled';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { PaletteColorKey, PaletteKey, Theme, ThemeContext } from '../theme';

export type IconSourceType = 'fab' | 'fas';

interface StyledFontAwesomeIconProps {
  theme: Theme
  palette: PaletteKey;
  paletteColor: PaletteColorKey;
  fontSize?: string;
}
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledFontAwesomeIconProps>`
  ${props => `
    color: ${props.theme.palette[props.palette][props.paletteColor]};
    ${props.fontSize ? `font-size: ${props.fontSize};` : ''} 
    ${props.fontSize ? `line-height: ${props.fontSize};` : 'line-height: 1rem;'}
    vertical-align: middle; 
  `}
`;

interface Props {
  type?: IconSourceType;
  keyword: string;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  size?: string;
}
export default (props: Props) => {
  const {
    type,
    keyword,
    palette,
    paletteColor,
    size,
  } = props;
  const { theme } = useContext(ThemeContext);
  const defaultType = 'fas';

  return (
    <StyledFontAwesomeIcon
      theme={theme}
      icon={[type ?? defaultType, keyword as IconName]}
      palette={palette ?? 'default'}
      paletteColor={paletteColor ?? 'text'}
      fontSize={size}
    />
  );
}
