import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@/components/button/Button';
import Container from '@/components/container/Container';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import { oAuth2Login } from '@/services/oAuth2/index';

export const getServerSideProps = WithDefaultServerSideProps();

export default ({ currentUser }) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <Container>
      <Button onClick={() => handleClickBackButton()}>
        뒤로가기
      </Button>
      <span>
        {commonTranslation('sentences.hello_world')}
      </span>
      {currentUser && <span>{currentUser.name}</span>}
      <Button onClick={() => oAuth2Login('github')}>
        GitHub 로그인
      </Button>
    </Container>
  );
};
