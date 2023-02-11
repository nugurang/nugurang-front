import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import { WithDefaultServerSideProps, WithDefaultServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { GetServerSidePropsContext } from 'next/types';
import Header2 from '@/components/text/Header2';
import Paragraph from '@/components/text/Paragraph';

export const getServerSideProps = WithDefaultServerSideProps((
  context: GetServerSidePropsContext,
  props: WithDefaultServerSidePropsResponse,
) => {
  const statusCode = context.res.statusCode ?? 404 ;
  return {
    props: {
      ...props,
      statusCode
    }
  }
});

interface PageProps extends WithDefaultServerSidePropsResponse {
  statusCode: string;
}
export default ({ statusCode }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  const handleGoHomeButton = () => {
    router.push('/');
  };

  return (
    <CenterizedContainer>
      <Box
        width='400px'
        maxWidth='100vw'
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
      >
        <Header2 align='center'>
          {`Error: ${statusCode}`}
        </Header2>
        <Paragraph align='center'>
          {commonTranslation('sentences.unexpected_error_occurred')}
        </Paragraph>
        <ButtonGroup>
          <Button
            fullWidth
            fillVariant='filled'
            palette='error'
            onClick={() => handleClickBackButton()}
          >
            뒤로가기
          </Button>
          <Button
            fullWidth
            fillVariant='filled'
            palette='default'
            onClick={() => handleGoHomeButton()}
          >
            홈으로
          </Button>
        </ButtonGroup>
      </Box>
    </CenterizedContainer>
  );
};
