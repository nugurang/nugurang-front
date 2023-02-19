import { MouseEventHandler } from 'react';
import { useTranslation } from 'next-i18next';
import Avatar from '@/components/button/Avatar';
import Button from '@/components/button/Button';
import Box from '@/components/layout/Box';
import Text from '@/components/text/Text';
import ButtonGroup from '@/components/button/ButtonGroup';
import Card from '@/components/paper/Card';
import { UserDTO } from '@/dtos/user';

const UserNameTextCss = `
  display: block;
  font-size: 20px;
  font-weight: bold;
`;

const UserEmailTextCss = `
  display: block;
  font-size: 16px;
`;

interface Props {
  currentUser?: UserDTO;
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
        <Text css={UserNameTextCss}>{currentUser?.name}</Text>
        <Text css={UserEmailTextCss}>{currentUser?.email}</Text>
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
