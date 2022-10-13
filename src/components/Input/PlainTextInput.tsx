import React from 'react';
import { TextInput, TextInputProps } from 'grommet';

interface PlainTextInputProps extends TextInputProps {}
const PlainTextInput: React.FunctionComponent<PlainTextInputProps> = (
  props: PlainTextInputProps,
) => {
  return <TextInput {...props}></TextInput>;
};

export default PlainTextInput;
