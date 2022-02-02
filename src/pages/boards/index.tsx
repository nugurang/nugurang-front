import * as constants from '@/src/constants';

import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { queryToBackend } from '@/src/utils/backend';
import styled from '@emotion/styled';
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

const StyledBoardGridDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`;

const StyledBoardGridItemDiv = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    height: 192px;
    border-radius:  ${props.theme.borderRadius.round};
  `}
`;

interface Board {
  id: number;
  name: string;
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
  const { t } = useTranslation('common');
  return (
    <Container
      currentUser={currentUser}
      header
      footer
      navigationBar
      callbackUrl={callbackUrl}
    >
      <StyledBoardGridDiv>
        {
          boards.map((board: Board, index: number) => {
            return <StyledBoardGridItemDiv
              key={index}
              acrylic={true}
            >
              {board.name}
            </StyledBoardGridItemDiv>
          })
        }
      </StyledBoardGridDiv>
    </Container>
  );
}

export default BoardsIndex;
