import produce from 'immer';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Card from '@/components/paper/Card';
import Accordion from '@/components/layout/Accordion';
import Box from '@/components/layout/Box';
import Text from "@/components/text/Text";
import { PlainObject } from '@/constants/common';
import { ReactNode, useState } from 'react';

const Sidebar = styled.aside`
  margin-top: 16px;

  @media (max-width: 1280px) {
    display: none;
  }
  @media (min-width: 1280px) {
    display: block;
    flex-basis: 248px;
    position: relative;
    overflow: scroll;
  }

  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface Props {
  children: ReactNode | string;
}
export default (props: Props) => {
  const {
    children,
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
      {children}
    </Sidebar>
  );
}
