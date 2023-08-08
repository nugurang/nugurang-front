'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

import Autocomplete from "@/components/Autocomplete";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import FontAwesomeIconButton from "@/components/FontAwesomeIconButton";
import Logo from "@/components/Logo";

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export interface HeaderProps {
}

export default function Header({
}: HeaderProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const renderLogoPart = () => (
    <Logo
      onClick={() => router.push('/')}
    />
  )

  const renderSessionPart = () => (
    <>
      {status === 'authenticated' && (
        <Avatar
          src={session.user?.image ?? ''}
          onClick={() => router.push('/common/my')}
        />
      )}
      {status === 'unauthenticated' && (
        <Button
          label='Sign in'
          onClick={() => signIn()}
        />
      )}
    </>
  )

  return (
    <div className={[
      'fixed', 'top-0', 'left-0', 'right-0',
      'my-0',
      'bg-white',
      'z-40',
    ].join(' ')}>
      <div className={[
        'flex', 'justify-center', 'items-center', 'gap-2',
        'relative',
        'mx-auto', 'h-16', 'max-w-screen-sm',
        'rounded-3xl'
      ].join(' ')}>
        <div className={[
          'absolute', 'top-0', 'bottom-0', 'left-0',
          'flex', 'justify-center', 'items-center', 'gap-2',
        ].join(' ')}>
          
        </div>
        <div className={[
          'flex', 'justify-center', 'items-center', 'gap-2',
          'p-16',
        ].join(' ')}>
          <div className={[
            'flex', 'justify-center', 'items-center', 'gap-2',
          ].join(' ')}>
            {renderLogoPart()}
          </div>
          <Autocomplete
            type='search'
            className={[
              'w-full', 'sm:max-w-[16rem]'
            ].join(' ')}
          />
          <FontAwesomeIconButton icon={faSearch} />
        </div>
        <div className={[
          'flex', 'justify-center', 'items-center', 'gap-2',
          'absolute', 'top-0', 'bottom-0', 'right-0',
        ].join(' ')}>
          {renderSessionPart()}
        </div>
      </div>
    </div>
  );
}

export function HeaderSpacer() {
  return (
    <div className="h-16 max-w-screen-sm">
    </div>
  );
}
