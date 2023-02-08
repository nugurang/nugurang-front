import { ChangeEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import { FillVariantKey, PaletteKey, Theme, ThemeContext } from '../theme';

const Textfield = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  padding: 8px 0;
  font-size: 16px;
`;

interface InputProps {
  theme: Theme;
}
const Input = styled.input<InputProps>`
  display: inline-block;
  width: 100%;
  padding: 16px;
  border: 2px solid ${props => props.theme.palette.default.main};
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;

  :focus {
    border-color: ${props => props.theme.palette.primary.main};
    outline: none !important;
  }
`;
// box-shadow: 0 0 4px ${props => props.theme.palette.primary.main};

interface Props {
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
export default (props: Props) => {
  const {
    id,
    name,
    placeholder,
    value,
    onChange,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <Textfield>
      <Label htmlFor={name}>{placeholder}</Label>
      <Input
        theme={theme}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Textfield>
  );
}
