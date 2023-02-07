import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import Avatar from '@/components/button/Avatar';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Card from '@/components/layout/Card';
import Text from '@/components/text/Text';
import type { GetCurrentUserResponseData } from '@/services/api/user';

const NameCss = `
  font-size: 20px;
  font-weight: bolder;
`;

interface Props {
  currentUser?: GetCurrentUserResponseData;
  onClickLogoutButton?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    currentUser,
    onClickLogoutButton
  } = props;
 
  return (
    <Box
      horizontalPaddingLevel={1}
      verticalPaddingLevel={1}
    >
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
          <Avatar size={'64px'}/>
          <Text variant='p' css={NameCss}>{currentUser?.name ?? ''}</Text>
          <Text variant='p'>{currentUser?.email ?? ''}</Text>
          <ButtonGroup direction='vertical'>
            <Button
              onClick={onClickLogoutButton}
            >
              마이페이지
            </Button>
            <Button
              onClick={onClickLogoutButton}
            >
              로그아웃
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    </Box>
  );
}
