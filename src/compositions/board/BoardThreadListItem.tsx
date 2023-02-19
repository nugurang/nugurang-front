import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import ButtonBase from '@/components/base/ButtonBase';
import Card from '@/components/paper/Card';
import Text from '@/components/text/Text';;
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '@/components/theme';
import type { Thread } from '@/services/api/thread';

const ThreadInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 128px;
`;

interface ThreadTitleWrapProps {
  theme: Theme;
}
const ThreadTitleWrap = styled.div<ThreadTitleWrapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
`;

interface Props {
  thread: Thread;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    thread,
    onClick,
  } = props;
  const { t: boardsTranslation } = useTranslation('boards');
  const { theme } = useContext(ThemeContext);
 
  return (
    <Card>
      <ButtonBase fullWidth onClick={onClick}>
        <ThreadInnerWrap>
          <ThreadTitleWrap theme={theme}>
            <Text palette='default' align='center'>
              {thread.name}
            </Text>
          </ThreadTitleWrap>
        </ThreadInnerWrap>
      </ButtonBase>
    </Card>
  );
}
