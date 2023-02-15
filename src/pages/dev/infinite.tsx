import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import Article from '@/compositions/page/Article';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import VirtuallyInfiniteScrollList from '@/components/list/VirtuallyInfiniteScrollList';
import { useState } from 'react';

export const getServerSideProps = WithDefaultServerSideProps();

export default () => {
  const { t: commonTranslation } = useTranslation('common');
  const [list, setList] = useState<number[]>([]);

  const onEndOfListReached = () => {
    setList(list => [...list, list.length + 1]);
  }

  return (
    <Container>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main>
          <Section backButton={false} title={commonTranslation('sentences.hello_world')}>
            <Article title={commonTranslation('sentences.hello_world')}>
              <VirtuallyInfiniteScrollList
                windowHeight={720}
                itemHeight={40}
                onInitialize={onEndOfListReached}
                onEndOfListReached={onEndOfListReached}
              >
                {list.map((item, index) => (
                  <div key={index}>
                    {item}
                  </div>
                ))}
              </VirtuallyInfiniteScrollList>
            </Article>
          </Section>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
