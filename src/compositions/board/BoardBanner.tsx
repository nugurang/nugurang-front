import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Card from '@/components/paper/Card';
import type { Board } from '@/services/api/board';
import Paragraph from '@/components/text/Paragraph';
import Banner from '../common/Banner';

interface Props {
  board: Board;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    board,
  } = props;
  const { t: commonTranslation } = useTranslation('common');
  const { t: boardsTranslation } = useTranslation('boards');
 
  return (
    <Banner
      imageUrl={board.imageUrl}
      title={boardsTranslation(`boards.${board.i18nKey}`)}
      backButton
    >
      <Paragraph palette='default' align='right'>
      {`${boardsTranslation(`boards.${board.i18nKey}`)} Brief Info Here`}
      </Paragraph>
    </Banner>
  );
}
