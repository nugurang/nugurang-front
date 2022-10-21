import React from 'react';
import { TextInput, TextInputProps } from 'grommet';

type PlainTextInputProps = TextInputProps;
const PlainTextInput: React.FunctionComponent<PlainTextInputProps> = (
  props: PlainTextInputProps,
) => {
  return <TextInput {...props} />;
};

export default PlainTextInput;
