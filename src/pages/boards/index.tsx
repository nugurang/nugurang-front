import * as constants from '@/src/constants';

import Container from '@/src/components/Container';
import Div from '@/src/components/base/Div';
import { GetServerSideProps } from 'next';
import Img from '@/src/components/base/Img';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import type { ThemeObject } from '@/src/components/base/common';
import Thumbnail from '@/src/components/Thumbnail';
import { queryToBackend } from '@/src/utils/backend';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user',
  async (context: any, props: any) => {
    
    const getBoardsByNamesResponse = await queryToBackend(context, `
      query GetBoardsByNames($names: [String]!) {
        getBoardsByNames(names: $names) {
          id
          name
        }
      }
    `, {
      names: constants.COMMON_BOARD_NAMES
    });

    // 임시 코드
    const imageObject: any = {
      activity: 'https://cdn.pixabay.com/photo/2017/08/12/19/01/legs-2635038_960_720.jpg',
      circle: 'https://cdn.pixabay.com/photo/2017/10/13/12/29/hands-2847508_960_720.jpg',
      competition: 'https://cdn.pixabay.com/photo/2014/12/14/16/05/arm-wrestling-567950_960_720.jpg',
      hobby: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_960_720.jpg',
      startup: 'https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_960_720.jpg',
      study: 'https://cdn.pixabay.com/photo/2019/03/10/03/36/reading-4045414_960_720.jpg'
    };
    getBoardsByNamesResponse.data.getBoardsByNames = getBoardsByNamesResponse.data.getBoardsByNames.map((board: any) => {
      return {
        ...board,
        image: {
          address: imageObject[board.name]
        }
      }
    })

    return {
      props: {
        ...props,
        boards: getBoardsByNamesResponse.data.getBoardsByNames
      }
    }

  }
);

interface StyledProps {
  theme: ThemeObject;
}

const StyledPageOverviewImageWrap = styled(Img)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledBoardGridDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
    margin-top: 16px;
    ${props.theme.screenSizeMediaQuery.gtePhablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    ${props.theme.screenSizeMediaQuery.gteLaptop} {
      grid-template-columns: repeat(3, 1fr);
    }
  `}
`;

interface Board {
  id: number;
  name: string;
  image: {
    address: string;
  }
}

interface PageProps {
  callbackUrl: string,
  currentUser: any,
  boards: Board[]
}

const BoardsIndex: NextPage<PageProps> = ({
  callbackUrl,
  currentUser,
  boards
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container
      currentUser={currentUser}
      callbackUrl={callbackUrl}
    >
      <Section>
        <PageOverview
          firstChildren={<>
            <StyledPageOverviewImageWrap
              src='https://image.freepik.com/free-vector/tiny-characters-sitting-laptop-with-lorem-ipsum-title_74855-20389.jpg?w=996'
            />
          </>}
          secondChildren={<>
            Hello
          </>}
        />
        <StyledBoardGridDiv>
          {
            boards
            .sort((lhs, rhs) => t(lhs.name) > t(rhs.name) ? 1 : -1)
            .map((board: Board, index: number) => {
              return <Thumbnail
                key={index}
                imageUrl={board.image.address}
                title={t(board.name)}
                onClick={() => router.push({
                  pathname: '/boards/[id]',
                  query: { id: board.id },
                })}
              />
            })
          }
        </StyledBoardGridDiv>
      </Section>
    </Container>
  );
}

export default BoardsIndex;
