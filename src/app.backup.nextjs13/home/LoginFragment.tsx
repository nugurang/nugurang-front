'use client';

import { oAuth2Login, logout } from '@/services/oAuth2/index';
import Button from "@/components/buttons/Button";

interface FragmentProps {
  isLoggedIn: boolean,
  username: string
}

export default (props: FragmentProps) => {
  const {
    isLoggedIn,
    username
  } = props;

  const handleClickLoginButton = async () => {
    await oAuth2Login('github');
  };
  const handleClickLogoutButton = async () => {
    await logout();
  };

  return (
    <>
      <p>hello_world</p>
      {!isLoggedIn && (
        <Button onClick={handleClickLoginButton} >로그인</Button>
      )}
      {isLoggedIn && (
        <>
          <p>Hello, {username}!</p>
          <Button onClick={handleClickLogoutButton} >로그아웃</Button>
        </>
      )}
    </>
  );
}
