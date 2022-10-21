import { useState } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import {
  Container,
  ContainerSection,
  ContainerSectionHeader,
  ContainerSubsection,
} from '@/components/Container';
import { PlainTextInput } from '@/components/Input';
import { getCurrentOAuth2User } from '@/services/oAuth2User';
import { createUser } from '@/services/user';
import { oAuthLogin } from '@/utilities/backend';

export const getServerSideProps = async (context) => {
  const currentOAuth2UserResponse = await getCurrentOAuth2User(context);
  console.error(currentOAuth2UserResponse);
  if (currentOAuth2UserResponse.data === undefined) {
    return {
      redirect: {
        destination: '/signin/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentOAuth2User: currentOAuth2UserResponse.data,
    },
  };
};

function Signup({ currentOAuth2User }) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: currentOAuth2User.name || '',
    email: currentOAuth2User.email || '',
    biography: currentOAuth2User.biography || '',
  });
  const updateFormState = (patchObject) => {
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
    const response = await createUser(null, {
      name: formState.name,
      email: formState.email,
      biography: formState.biography,
    });
    if (response.data.id) {
      await oAuthLogin(currentOAuth2User.oAuth2Provider);
    }
  };

  return (
    <Container>
      <ContainerSection>
        <ContainerSectionHeader
          title="회원가입"
          subtitle="처음이시군요! 회원가입을 진행합니다."
          actions={
            <Box>
              <Button
                label="뒤로가기"
                onClick={() => handleClickBackButton()}
              />
            </Box>
          }
        />
        <ContainerSubsection>
          <PlainTextInput
            placeholder="name"
            value={formState.name}
            onChange={(event) => updateFormState({ name: event.target.value })}
          />
          <PlainTextInput
            placeholder="email"
            value={formState.email}
            onChange={(event) => updateFormState({ email: event.target.value })}
          />
          <PlainTextInput
            placeholder="biography"
            value={formState.biography}
            onChange={(event) =>
              updateFormState({ biography: event.target.value })
            }
          />
        </ContainerSubsection>
        <ContainerSubsection align="center">
          <Button label="제출" onClick={handleClickSubmitButton} />
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
}

export default Signup;
