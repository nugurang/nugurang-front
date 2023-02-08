import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import produce from 'immer';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedPage from '@/compositions/page/CenterizedPage';
import Container from '@/compositions/container/Container';
import Text from '@/components/text/Text';
import Textfield from '@/components/input/Textfield';
import { PlainObject, wallpaperSourceUrl } from '@/constants/common';
import UserAlreadyExistsError from '@/errors/network/UserAlreadyExistsError';
import { WithCheckOAuth2ServerSideProps, WithCheckOAuth2ServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { createUser } from '@/services/api/user';
import { oAuth2Login } from '@/services/oAuth2/index';

export const getServerSideProps = WithCheckOAuth2ServerSideProps();

interface PageProps extends WithCheckOAuth2ServerSidePropsResponse {}
export default ({ currentOAuth2User }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: currentOAuth2User.name || '',
    email: currentOAuth2User.email || '',
    biography: '',
  });
  const updateFormState = (patchObject: PlainObject) => {
    setFormState((baseObject) =>
      produce(baseObject, (draftObject) => ({
        ...draftObject,
        ...patchObject,
      })),
    );
  };

  const handleClickBackButton = () => {
    router.back();
  };
  const handleClickSubmitButton = async () => {
    try {
      const response = await createUser({
        user: {
          name: formState.name,
          email: formState.email,
          biography: formState.biography,
        }
      });
      if(response?.data?.id) {
        await oAuth2Login(currentOAuth2User.oAuth2Provider);
      }
    } catch (error) {
      if(error instanceof UserAlreadyExistsError) alert('User already exists!');
    }
  };

  return (
    <Container
      centerizeVertically
      showHeader={false}
      wallpaperUrl={wallpaperSourceUrl}
    >
      <CenterizedPage>
        <Box
          width='400px'
          maxWidth='100vw'
          horizontalPaddingLevel={2}
          verticalPaddingLevel={2}
        >
          <Box>
            <Text variant='h2' align='center'>
              {commonTranslation('sentences.welcome')}
            </Text>
            <Text variant='p' align='center'>
              {commonTranslation('sentences.please_check_your_user_data')}
            </Text>
          </Box>
          <Textfield
            id='name'
            name='name'
            placeholder='name'
            value={formState.name}
            onChange={(event) => updateFormState({ name: event.target.value })}
          />
          <Textfield
            id='email'
            name='email'
            placeholder='email'
            value={formState.email}
            onChange={(event) => updateFormState({ email: event.target.value })}
          />
          <Textfield
            id='biography'
            name='biography'
            placeholder='biography'
            value={formState.biography}
            onChange={(event) =>
              updateFormState({ biography: event.target.value })
            }
          />
          <ButtonGroup>
            <Button
              fullWidth
              palette='error'
              onClick={handleClickBackButton}
            >뒤로가기</Button>
            <Button
              fullWidth
              palette='primary'
              onClick={handleClickSubmitButton}
            >제출</Button>
          </ButtonGroup>
        </Box>
      </CenterizedPage>
    </Container>
  );
};
