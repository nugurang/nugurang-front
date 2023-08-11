'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react';

import Avatar from '@/components/Avatar';
import Box from '@/components/Box';
import Button, { HorizontalButtonGroup } from '@/components/Button';
import Card from '@/components/Card';
import Dialog from '@/compositions/Dialog';
import { BackdropContext } from '@/providers/BackdropProvider';

import {
  faKey
} from "@fortawesome/free-solid-svg-icons";

export default function BriefProfileFragment() {
  const { openBackdrop, closeBackdrop } = useContext(BackdropContext);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClickLogoutButton = () => {
    openBackdrop(
      <Dialog
        icon={{
          icon: faKey,
          palette: 'error',
          variant: 'text',
        }}
        title='로그아웃'
        subtitle='정말 로그아웃하시겠습니까?'
        bottomButtonList={[
          {
            label: 'No',
            onClick: () => closeBackdrop()
          },
          {
            label: 'Yes',
            palette: 'error',
            onClick: () => signOut()
          },
        ]}
        onClickCancel={() => closeBackdrop()}
      />
    )
  };

  return (
    <Card>
      <Box className='min-h-[6rem]'>
        {status === 'loading' && (
          <></>
        )}
        {status === 'authenticated' && (
          <>
            <div className='flex gap-5 p-2'>
              <Avatar
                src={session.user?.image ?? ''}
                size={16}
              />
              <div>
                <span className='block'>
                  {session.user?.name ?? ''}
                </span>
                <span className='block'>
                  {session.user?.email ?? ''}
                </span>
              </div>
            </div>
          </>
        )}
        {status === 'unauthenticated' && (
          <></>
        )}
      </Box>
      <Box paddingTop={false} className='min-h-[2rem]'>
        {status === 'loading' && (
          <></>
        )}
        {status === 'authenticated' && (
          <HorizontalButtonGroup>
            <Button
              label='Settings'
              onClick={() => router.push('/common/my/settings')}
            />
            <Button
              label='Sign out'
              palette='error'
              onClick={() => handleClickLogoutButton()}
            />
          </HorizontalButtonGroup>
        )}
        {status === 'unauthenticated' && (
          <>
            <Button
              label='Sign in'
              onClick={() => signIn()}
            />
          </>
        )}
      </Box>
    </Card>
  );
}
