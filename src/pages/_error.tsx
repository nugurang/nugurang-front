import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import Text from '@/components/text/Text';
import { WithDefaultServerSideProps, WithDefaultServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { GetServerSidePropsContext } from 'next/types';

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
        <Text variant='h2' align='center'>
          {`Error: ${statusCode}`}
        </Text>
        <Text variant='p' align='center'>
          {commonTranslation('sentences.unexpected_error_occurred')}
        </Text>
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
