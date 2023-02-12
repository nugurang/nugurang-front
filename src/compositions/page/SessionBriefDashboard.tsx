import { MouseEventHandler } from 'react';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Avatar from '@/components/button/Avatar';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Card from '@/components/paper/Card';
import type { User } from '@/services/api/user';

const UserNameText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const UserEmailText = styled.p`
  font-size: 16px;
`;

interface Props {
  currentUser?: User;
  isLogoutModalOpen: boolean;
  isLogoutOngoing: boolean;
  onClickGoToMyAccountButton?: MouseEventHandler<HTMLButtonElement>;
  onClickLogoutButton?: MouseEventHandler<HTMLButtonElement>;
  onClickLogoutYesButton?: MouseEventHandler<HTMLButtonElement>;
  onClickLogoutNoButton?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    currentUser,
    onClickGoToMyAccountButton,
    onClickLogoutButton,
  } = props;
  const { t: commonTranslation } = useTranslation('common');

  return (
    <Card
      maxHeight='100vh'
      maxWidth='100vw'
    >
      <Box
        flex
        centerizeHorizontally
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
        gap={'8px'}
      >
        <Avatar size={'64px'}/>
        <UserNameText>{currentUser?.name}</UserNameText>
        <UserEmailText>{currentUser?.email}</UserEmailText>
        <ButtonGroup direction='vertical' fullWidth>
          <Button
            fillVariant='filled'
            palette='default'
            onClick={onClickGoToMyAccountButton}
          >
            {commonTranslation('words.my_account')}
          </Button>
          <Button
            fillVariant='filled'
            palette='error'
            onClick={onClickLogoutButton}
          >
            {commonTranslation('words.sign_out')}
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
}
