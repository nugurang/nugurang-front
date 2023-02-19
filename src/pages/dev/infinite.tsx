import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import VirtuallyInfiniteScrollList from '@/components/list/VirtuallyInfiniteScrollList';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Card from '@/components/paper/Card';

export const getServerSideProps = WithDefaultServerSideProps();

export default () => {
  const { t: commonTranslation } = useTranslation('common');
  const [list, setList] = useState<string[]>([]);
  const [isEndOfListReached, setEndOfListReached] = useState<boolean>(false);
  
  const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

  const onLoadMore = async () => {
    if(list.length <= 50) {
      await wait(1000);
      setList(list => [...list,
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
      ]);
    } else {
      setEndOfListReached(_ => true);
    }
  };

  useEffect(() => {
    console.log(list.length)
    if(list.length >= 50) {
      setEndOfListReached(true);
    }
  }, [list]);

  return (
    <Container>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main fullHeight>
          <div>Hi there</div>
          <VirtuallyInfiniteScrollList
            column={3}
            isEndOfListReached={isEndOfListReached}
            onInitialize={onLoadMore}
            onLoadMore={() => onLoadMore()}
          >
            {list.map((item, index) => (
              <div key={index}>
                {`${index}. ${item}`}
              </div>
            ))}
          </VirtuallyInfiniteScrollList>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
