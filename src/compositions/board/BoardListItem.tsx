import { MouseEventHandler } from 'react';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import ButtonBase from '@/components/base/ButtonBase';
import Card from '@/components/paper/Card';
import ListItem from '@/components/list/ListItem';
import Text from '@/components/text/Text';
import type { Board } from '@/services/api/board';

interface Props {
  board: Board;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    board,
    onClick,
  } = props;
  const { t: commonTranslation } = useTranslation('common');
  const { t: boardsTranslation } = useTranslation('boards');
 
  return (
    <ListItem>
      <ButtonBase fullWidth onClick={onClick}>
        <Card
          maxHeight='100vh'
          maxWidth='100vw'
        >
          <Box
            centerizeHorizontally
            horizontalPaddingLevel={2}
            verticalPaddingLevel={2}
            gap={'8px'}
          >
            <Text palette='default'>
              {boardsTranslation(board.i18nKey)}
            </Text>
          </Box>
        </Card>
      </ButtonBase>
    </ListItem>
  );
}
