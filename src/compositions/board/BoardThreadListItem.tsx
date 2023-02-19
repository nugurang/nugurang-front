import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import ButtonBase from '@/components/base/ButtonBase';
import Card from '@/components/paper/Card';
import Image from '@/components/graphic/Image';
import Text from '@/components/text/Text';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '@/components/theme';
import { ThreadDTO } from '@/dtos/thread';

const ThreadContentWrap = styled.div`
  height: 128px;
  margin: 8px;
`;

const ThreadTextWrap = styled.div`
  height: 128px;
  width: 100%;
  &>* {
    display: block;
  }
`;

interface Props {
  thread: ThreadDTO;
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
        <Image
          src={thread.firstArticle?.images[0]?.address}
          alt=''
          height='128px'
          width='100%'
        />
        <ThreadContentWrap>
          <ThreadTextWrap>
            <Text palette='default' weight='bold'>
              {thread.name}
            </Text>
            <Text palette='default' ellipsis={2}>
              {thread.firstArticle.content}
            </Text>
          </ThreadTextWrap>
        </ThreadContentWrap>
      </ButtonBase>
    </Card>
  );
}
