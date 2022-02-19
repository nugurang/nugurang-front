import * as constants from '@/constants';

import BoardsIndexView from '@/components/templates/boards/index/IndexView';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import WithCommonPreferences from '@/components/WithCommonPreferences';
import { getBoardsByNames } from '@/backend/dao/board';
import { withAuthServerSideProps } from '@/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user',
  async (context: any, props: any) => {
    
    const getBoardsByNamesResponse = await getBoardsByNames(context, {
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
    getBoardsByNamesResponse.data = getBoardsByNamesResponse.data.map((board: any) => {
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
        boards: getBoardsByNamesResponse.data
      }
    }

  }
);

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

const BoardsIndex: NextPage<PageProps> = props => {
  return (
    <BoardsIndexView {...props} />
  );
}

export default WithCommonPreferences(BoardsIndex);
