import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import ButtonBase from '@/components/base/ButtonBase';
import Card from '@/components/paper/Card';
import ListItem from '@/components/list/ListItem';
import Text from '@/components/text/Text';
import type { Board } from '@/services/api/board';
import Image from '@/components/graphic/Image';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '@/components/theme';

const BoardInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &>*:first-child {
    flex-grow: 1;
  }
`;

interface BoardTitleWrapProps {
  theme: Theme;
}
const BoardTitleWrap = styled.div<BoardTitleWrapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  background-color: ${props => props.theme.palette.default.background};
`;

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
  const { theme } = useContext(ThemeContext);
 
  return (
    <ListItem>
      <Card>
        <ButtonBase fullWidth onClick={onClick}>
          <BoardInnerWrap>
            <Image
              src={board.imageUrl}
              alt=''
              height='152px'
              width='100%'
            />
            <BoardTitleWrap theme={theme}>
              <Text palette='default' align='center'>
                {boardsTranslation(`boards.${board.i18nKey}`)}
              </Text>
            </BoardTitleWrap>
          </BoardInnerWrap>
        </ButtonBase>
      </Card>
    </ListItem>
  );
}
