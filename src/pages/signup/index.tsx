import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import produce from 'immer';
import Box from '@/components/layout/Box';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CenterizedContainer from '@/compositions/container/CenterizedContainer';
import Textfield from '@/components/input/Textfield';
import { PlainObject, getImageUrl } from '@/constants/common';
import UserAlreadyExistsError from '@/errors/network/UserAlreadyExistsError';
import { WithCheckOAuth2ServerSideProps, WithCheckOAuth2ServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { createUser } from '@/services/api/user';
import { oAuth2Login } from '@/services/oAuth2/index';
import Header2 from '@/components/text/Header2';
import Paragraph from '@/components/text/Paragraph';

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
  const [isCreatingUser, setCreatingUser] = useState<boolean>(false);
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
      setCreatingUser(true);
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
      setCreatingUser(false);
      if(error instanceof UserAlreadyExistsError) alert('User already exists!');
    }
  };

  return (
    <CenterizedContainer
      wallpaperUrl={getImageUrl({ keyword: 'welcome' })}
    >
      <Box
        width='400px'
        maxWidth='100vw'
        horizontalPaddingLevel={2}
        verticalPaddingLevel={2}
      >
        <Box>
          <Header2 align='center'>
            {commonTranslation('sentences.welcome')}
          </Header2>
          <Paragraph align='center'>
            {commonTranslation('sentences.please_check_your_user_data')}
          </Paragraph>
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
          >
            {commonTranslation('words.go_back')}
          </Button>
          <Button
            fullWidth
            isLoading={isCreatingUser}
            palette='primary'
            onClick={handleClickSubmitButton}
          >
            {commonTranslation('words.submit')}
          </Button>
        </ButtonGroup>
      </Box>
    </CenterizedContainer>
  );
};
