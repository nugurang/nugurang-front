import React from 'react';
import {
  Paragraph as OriginalParagraph,
  ParagraphExtendedProps,
} from 'grommet';

type ParagraphProps = ParagraphExtendedProps;
const Paragraph: React.FunctionComponent<ParagraphProps> = (
  props: ParagraphProps,
) => {
  return <OriginalParagraph {...props} />;
};

export default Paragraph;
