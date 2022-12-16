'use client';

import produce from 'immer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/buttons/Button';
import type { PlainObject } from '@/constants/common';

interface FragmentProps {
  initialValue: {
    username: string,
    email: string,
  }
  submitForm: Function
}

export default (props: FragmentProps) => {
  const { initialValue, submitForm } = props;
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    ...initialValue,
    biography: ''
  });
  const updateFormState = (patchObject: PlainObject) => {
    setFormValues((baseObject) =>
      produce(baseObject, (draftObject) => ({
        ...draftObject,
        ...patchObject,
      })),
    );
  };

  const handleClickBackButton = () => {
    router.back();
  };
  const handleClickSubmitButton = () => {
    submitForm();
  };

  return (
    <>
      <Button onClick={() => handleClickBackButton()} >
        뒤로가기
      </Button>
      <input
        placeholder='name'
        value={formValues.username}
        onChange={(event) => updateFormState({ name: event.target.value })}
      />
      <input
        placeholder='email'
        value={formValues.email}
        onChange={(event) => updateFormState({ email: event.target.value })}
      />
      <input
        placeholder='biography'
        value={formValues.biography}
        onChange={(event) =>
          updateFormState({ biography: event.target.value })
        }
      />
      <Button onClick={handleClickSubmitButton} >제출</Button>
    </>
  );
}
