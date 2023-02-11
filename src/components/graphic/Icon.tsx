import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { PaletteColorKey, PaletteKey, Theme, ThemeContext } from '../theme';

export type IconSourceType = 'fab' | 'fas';

interface StyledFontAwesomeIconProps {
  theme: Theme
  palette: PaletteKey;
  palettecolor: PaletteColorKey; // Warning: React does not recognize the `paletteColor` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `palettecolor` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
  fontSize?: string;
}
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledFontAwesomeIconProps>`
  ${props => `
    ${props.palettecolor
      ? `color: ${props.theme.palette[props.palette][props.palettecolor]};`
    : ''}
    ${props.fontSize ? `font-size: ${props.fontSize};` : ''} 
    ${props.fontSize ? `line-height: ${props.fontSize};` : 'line-height: 1rem;'}
    vertical-align: middle; 
  `}
`;

// https://blog.hao.dev/render-client-side-only-component-in-next-js
interface ClientOnlyProps {
  children: React.ReactNode;
}
const ClientOnly: React.FC<ClientOnlyProps> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

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
  const defaultKeyword = 'question';

  return (
    <ClientOnly>
      <StyledFontAwesomeIcon
        theme={theme}
        icon={[type ?? defaultType, (keyword ?? defaultKeyword) as IconName]}
        palette={palette ?? 'default'}
        palettecolor={paletteColor ?? 'text'}
        fontSize={size}
      />
    </ClientOnly>
  );
}
