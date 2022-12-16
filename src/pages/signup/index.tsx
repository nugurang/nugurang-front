import { useState } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';
import { createUser } from '@/services/api/user';
import { oAuth2Login } from '@/services/oAuth2/index';
import { PlainObject } from '@/constants/common';
import { WithCheckOAuth2ServerSideProps, WithCheckOAuth2ServerSidePropsResponse } from '@/hocs/WithServerSideProps';

export const getServerSideProps = WithCheckOAuth2ServerSideProps();

interface PageProps extends WithCheckOAuth2ServerSidePropsResponse {}
export default ({ currentOAuth2User }: PageProps) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: currentOAuth2User.data.name || '',
    email: currentOAuth2User.data.email || '',
    biography: currentOAuth2User.data.biography || '',
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
    const response = await createUser({
      user: {
        name: formState.name,
        email: formState.email,
        biography: formState.biography,
      }
    });
    if (response.data.id) {
      await oAuth2Login(currentOAuth2User.data.oAuth2Provider);
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
};
