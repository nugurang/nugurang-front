'use client';

import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react';

import Avatar from '@/components/Avatar';
import Box from '@/components/Box';
import Button, { HorizontalButtonGroup } from '@/components/Button';
import Card from '@/components/Card';

export default function BriefProfileFragment() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
              onClick={() => signOut()}
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
