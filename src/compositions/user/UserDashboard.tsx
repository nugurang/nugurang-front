import { MouseEventHandler } from 'react';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import React from 'react';
import Avatar from '../../components/button/Avatar';
import Text from '../../components/text/Text';
import { User } from '@/services/api/user';
import ButtonGroup from '@/components/button/ButtonGroup';
import Button from '@/components/button/Button';

const UserDashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  gap: 8px 16px;
`;

const UserMainInfoWrap = styled.div`
  flex-grow: 1;
`;

const UserAvatarWrap = styled.div`
`;

const UserNameText = styled.p`
  font-size: 24px;
`;

const UserEmailText = styled.p`
  font-size: 20px;
`;

interface Props {
  user: User;
  onClickLogoutButton?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    user,
    onClickLogoutButton,
  } = props;
  const { t: commonTranslation } = useTranslation('common');

  return (
    <UserDashboard>
      <UserAvatarWrap>
        <Avatar size={'64px'}/>
      </UserAvatarWrap>
      <UserMainInfoWrap>
        <UserNameText>{user.name}</UserNameText>
        <UserEmailText>{user.email}</UserEmailText>
        <Text>{user.biography}</Text>
      </UserMainInfoWrap>
      <ButtonGroup
        direction='horizontal'
      >
        <Button
          fillVariant='filled'
          palette='error'
          onClick={onClickLogoutButton}
        >
          {commonTranslation('words.sign_out')}
        </Button>
      </ButtonGroup>
    </UserDashboard>
  );
}
