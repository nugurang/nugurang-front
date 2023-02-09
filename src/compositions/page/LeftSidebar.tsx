import produce from 'immer';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Card from '@/components/layout/Card';
import Accordion from '@/components/layout/Accordion';
import Text from '@/components/text/Text';
import { PlainObject } from '@/constants/common';
import { useState } from 'react';
import Box from '@/components/layout/Box';

const Sidebar = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 24px;
  width: 100%;
  &:last-child {
    padding-bottom: 24px;
  }
`;

interface Props {
}
export default (props: Props) => {
  const {
  } = props;
  const [isOpen, setOpen] = useState<PlainObject>({
    'test': true,
  });
  const toggleOpen = (key: string) => setOpen(produce(isOpen, draft => {
    draft[key] = !draft[key];
  }))
  const { t: commonTranslation } = useTranslation('common');

  return (
    <Sidebar>
      <Card>
        <Accordion
          title={(
            <Box horizontalPaddingLevel={1} verticalPaddingLevel={1}>
              {commonTranslation('words.boards')}
            </Box>
          )}
          isOpen={isOpen['test']}
          onClickTitle={() => toggleOpen('test')}
        >
          <Box horizontalPaddingLevel={1} verticalPaddingLevel={1}>
            <div>* Test</div>
          </Box>
        </Accordion>
      </Card>
    </Sidebar>
  );
}
