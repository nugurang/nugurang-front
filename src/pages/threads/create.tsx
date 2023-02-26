import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import Article from '@/compositions/page/Article';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import Textfield from '@/components/input/Textfield';
import produce from 'immer';
import { useState } from 'react';
import { createThread } from '@/services/api/thread';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import { getBoard } from '@/services/api/board';
import { GetServerSidePropsContext } from 'next/types';
import { BoardDTO } from '@/dtos/board';
import { PlainObject } from '@/constants/common';
import Box from '@/components/layout/Box';

export const getServerSideProps = WithCheckUserServerSideProps(async (
  context: GetServerSidePropsContext,
  props: WithCheckUserServerSidePropsResponse,
) => {
  try {
    const { boardId } = context.query;
    if(!boardId) throw new InvalidQueryParamsError;
    const getBoardResponse = await getBoard({
      context,
      boardId: boardId as string,
    });
    return {
      props: {
        ...props,
        board: getBoardResponse.data.board,
      },
    };
  } catch(err) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
});

interface PageProps extends WithCheckUserServerSidePropsResponse {
  board: BoardDTO;
}
export default ({ currentUser, board }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: threadTranslation } = useTranslation('threads');
  const router = useRouter();
  const [threadFormState, setThreadFormState] = useState({
    name: '',
    event: '',
    team: '',
  });
  const updateThreadFormState = (patchObject: PlainObject) => {
    setThreadFormState((baseObject) =>
      produce(baseObject, (draftObject) => ({
        ...draftObject,
        ...patchObject,
      })),
    );
  };
  const [firstArticleFormState, setFirstArticleFormState] = useState({
    title: '',
    content: '',
    images: [],
  });
  const updateFirstArticleFormState = (patchObject: PlainObject) => {
    setFirstArticleFormState((baseObject) =>
      produce(baseObject, (draftObject) => ({
        ...draftObject,
        ...patchObject,
      })),
    );
  };
  const [isCreatingThread, setCreatingThread] = useState<boolean>(false);

  const handleClickBackButton = () => {
    router.back();
  };
  const handleClickSubmitButton = async () => {
    try {
      setCreatingThread(true);
      const response = await createThread({
        boardId: board.id,
        thread: threadFormState,
        firstArticle: firstArticleFormState,
      });
      if(response?.data?.id) {
        router.push({
          pathname: '/threads/detail',
          query: {
            threadId: response?.data?.id,
          },
        });
      }
    } catch (error) {
      setCreatingThread(false);
    }
  };

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main>
          <Section backButton={false}>
            <Article title={threadTranslation('words.thread')}>
              <Textfield
                id='name'
                name='name'
                placeholder={threadTranslation('words.thread_name')}
                value={threadFormState.name}
                onChange={(event) => updateThreadFormState({ name: event.target.value })}
              />
            </Article>
            <Article title={threadTranslation('words.first_article')}>
              <Textfield
                id='title'
                name='title'
                placeholder={threadTranslation('words.article_title')}
                value={firstArticleFormState.title}
                onChange={(event) => updateFirstArticleFormState({ title: event.target.value })}
              />
              <Textfield
                id='content'
                name='content'
                placeholder={threadTranslation('words.article_content')}
                value={firstArticleFormState.content}
                onChange={(event) =>
                  updateFirstArticleFormState({ content: event.target.value })
                }
              />
            </Article>
            <Box horizontalPaddingLevel={2}>
              <ButtonGroup>
                <Button
                  palette='error'
                  onClick={handleClickBackButton}
                >
                  {commonTranslation('words.go_back')}
                </Button>
                <Button
                  isLoading={isCreatingThread}
                  palette='primary'
                  onClick={handleClickSubmitButton}
                >
                  {commonTranslation('words.submit')}
                </Button>
              </ButtonGroup>
            </Box>
          </Section>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
