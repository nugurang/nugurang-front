import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Logger from '@/utilities/common/logger';
import { PlainObject } from '@/constants/common';

export default async () => {
  try {
    // cookies.delete('JSESSIONID');
    // cookies.delete('oAuthProvider');
    // cookies.delete('oAuthAuthorizationCode');
    redirect('/');
  } catch(error) {
    Logger.error(error as PlainObject);
    return <>로그아웃하는 중...</>;
  }
}
