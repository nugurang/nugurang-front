import React from 'react';
import { Paragraph as _Paragraph, ParagraphExtendedProps } from 'grommet';

interface ParagraphProps extends ParagraphExtendedProps {}
const Paragraph: React.FunctionComponent<ParagraphProps> = (
  props: ParagraphProps,
) => {
  return <_Paragraph {...props}></_Paragraph>;
};

export default Paragraph;
