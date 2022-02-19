import Button from '@/components/atoms/button/Button';
import Dialog from '@/components/molecules/dialog/Dialog';
import Loader from '@/components/atoms/loader/Loader';
import Section from '@/components/molecules/section/Section';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface ViewProps {
  currentOAuth2User: Object,
  callbackUrl: string;
  currentUser: any;
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const SandboxIndexView: React.FC<ViewProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  return (
    <WidthLimiter>
      <Section>
        {t('_helloWorld')}
        <Button
          variant='filled'
          palette='primary'
          onClick={() => router.push('/sandbox', '/sandbox', { locale: router.locale === 'en' ? 'ko' : 'en' })}
        >
          {`change-locale`}
        </Button>
        <Button
          variant='filled'
          palette='primary'
          onClick={() => props.setIsDark(!props.isDark)}
        >
          {props.isDark ? 'Dark' : 'Light'}
        </Button>
        <Button
          onClick={() => setOpen(true)}
        >
          Toggle Modal
        </Button>
        <Loader />
        <Dialog
          open={open}
          onClickBackdrop={() => setOpen(false)}
          title={'테스트 제목입니다.'}
          content={'테스트 본문입니다.'}
          onYes={() => {}}
          onNo={() => {}}
        />
      </Section>
    </WidthLimiter>
  );
}

export default SandboxIndexView;
