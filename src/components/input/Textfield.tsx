import { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';

const Textfield = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  padding: 8px 0;
  font-size: 16px;
`;

const Input = styled.input`
  display: inline-block;
  width: 100%;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
`;

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

  return (
    <Textfield>
      <Label htmlFor={name}>{placeholder}</Label>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Textfield>
  );
}
