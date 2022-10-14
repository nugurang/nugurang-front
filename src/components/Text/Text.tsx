import React from 'react';
import { Text as _Text, TextExtendedProps } from 'grommet';

interface TextProps extends TextExtendedProps {}
const Text: React.FunctionComponent<TextProps> = (props: TextProps) => {
  return <_Text {...props}></_Text>;
};

export default Text;
