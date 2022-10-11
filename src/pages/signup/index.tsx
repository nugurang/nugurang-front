import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextInput } from 'grommet';
import produce from 'immer';
import { getCurrentOAuth2User } from '@/services/oAuthUser';
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

const Signup = ({ currentOAuth2User }) => {
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
    console.log(response);
    if (response.data.id) {
      console.log(currentOAuth2User);
      await oAuthLogin(currentOAuth2User.oAuth2Provider);
    }
  };

  return (
    <>
      <TextInput
        placeholder="name"
        value={formState.name}
        onChange={(event) => updateFormState({ name: event.target.value })}
      />
      <TextInput
        placeholder="email"
        value={formState.email}
        onChange={(event) => updateFormState({ email: event.target.value })}
      />
      <TextInput
        placeholder="biography"
        value={formState.biography}
        onChange={(event) => updateFormState({ biography: event.target.value })}
      />
      <>
        <Button label="뒤로가기" onClick={() => handleClickBackButton()} />
        <Button
          label="제출"
          onClick={async () => await handleClickSubmitButton()}
        />
      </>
    </>
  );
};

export default Signup;
