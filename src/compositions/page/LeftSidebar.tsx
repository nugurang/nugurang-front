import produce from 'immer';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Card from '@/components/paper/Card';
import Accordion from '@/components/layout/Accordion';
import Box from '@/components/layout/Box';
import Text from "@/components/text/Text";
import { PlainObject } from '@/constants/common';
import { useState } from 'react';

const Sidebar = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 16px;
  width: 100%;
  &:last-child {
    padding-bottom: 16px;
  }
`;

interface Props {
}
export default (props: Props) => {
  const {
  } = props;
  const [isOpen, setOpen] = useState<PlainObject>({
    'boards': true,
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
              <Text>{commonTranslation('words.boards')}</Text>
            </Box>
          )}
          isOpen={isOpen['boards']}
          onClickTitle={() => toggleOpen('boards')}
        >
          <Box horizontalPaddingLevel={1} verticalPaddingLevel={1}>
            <Text>* Test</Text>
          </Box>
        </Accordion>
      </Card>
    </Sidebar>
  );
}
