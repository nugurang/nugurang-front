import React from 'react';
import { Text as OriginalText, TextExtendedProps } from 'grommet';

type TextProps = TextExtendedProps;
const Text: React.FunctionComponent<TextProps> = (props: TextProps) => {
  return <OriginalText {...props} />;
};

export default Text;
