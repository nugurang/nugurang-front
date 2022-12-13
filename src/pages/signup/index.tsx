import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import { createUser } from '@/services/api/user';
import { oAuthLogin } from '@/services/oAuth2/index';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const currentOAuth2UserResponse = await getCurrentOAuth2User(context);
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
    console.log(response)
    if (response.data.id) {
      await oAuthLogin(currentOAuth2User.oAuth2Provider);
    }
  };

  return (
    <>
        <button
          onClick={() => handleClickBackButton()}
        >뒤로가기</button>
          <input
            placeholder="name"
            value={formState.name}
            onChange={(event) => updateFormState({ name: event.target.value })}
          />
          <input
            placeholder="email"
            value={formState.email}
            onChange={(event) => updateFormState({ email: event.target.value })}
          />
          <input
            placeholder="biography"
            value={formState.biography}
            onChange={(event) =>
              updateFormState({ biography: event.target.value })
            }
          />
          <button onClick={handleClickSubmitButton} >제출</button>
    </>
  );
}

export default Signup;
