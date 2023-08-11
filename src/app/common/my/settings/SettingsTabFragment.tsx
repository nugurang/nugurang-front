'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@/components/Box';
import Button, { HorizontalButtonGroup } from '@/components/Button';
import Card, { CardHeader } from '@/components/Card';
import VerticalList, {
  TextVerticalListItem,
  ToggleSwitchVerticalListItem
} from '@/compositions/VerticalList';

import ClientSideSettingsService from '@/services/clientSideSettings';

import {
  faDisplay,
  faGear,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

export default function BriefProfileFragment() {
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = (event) => {
    ClientSideSettingsService.updateTheme(event.target.checked ? 'dark' : 'light')
    ClientSideSettingsService.applyTheme()
    setDarkMode(event.target.checked)
  }

  useEffect(() => {
    setDarkMode(ClientSideSettingsService.getTheme() === 'dark');
  }, [])

  return (
    <Card className={[
      'mt-4',
    ].join(' ')}>
      <Box className={[
        'flex', 'flex-col',
        'h-full',
      ].join(' ')}>
        <CardHeader
          title='설정'
          icon={{
            icon: faGear,
          }}
        />
        <VerticalList className={[
          'grow'
        ].join(' ')}>
          <TextVerticalListItem
            title='Lorem Ipsum'
            subtitle='Display'
            icon={{
              icon: faDisplay,
            }}
          />
          <ToggleSwitchVerticalListItem
            id='settings-theme'
            checked={isDarkMode}
            title='어두운 모드'
            subtitle='어두운 모드를 켜거나 끕니다.'
            icon={{
              icon: faMoon,
            }}
            onChange={toggleTheme}
          />
        </VerticalList>
        <HorizontalButtonGroup
          marginTop={true}
        >
          <Button label='More' />
        </HorizontalButtonGroup>
      </Box>
    </Card>
  );
}
