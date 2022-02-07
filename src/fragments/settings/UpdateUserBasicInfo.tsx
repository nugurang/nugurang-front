import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';
import { mutateToBackend, queryToBackend } from '@/src/utils/backend';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/base/Div';
import Section from '@/src/components/Section';
import Textfield from '@/src/components/base/Textfield';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface FragmentProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
  
  `}
`;

interface UpdateUserProps {
  name: string;
  email: string;
  biography: string;
  image: number;
}
const updateUser = async (props: UpdateUserProps) => {
  await mutateToBackend(null, `
    mutation UpdateUser($user: UserInput!) {
      updateCurrentUser (user: $user) {
        id
      }
    }
  `, {
    user: {
      name: props.name,
      email: props.email,
      biography: props.biography,
      image: props.image,
    }
  })
};

const UpdateUserBasicInfo: React.FC<FragmentProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const initialDialog = {
    open: false,
    title: '',
    content: '',
    pending: false,
  };
  const [dialog, setDialog] = useState(initialDialog);
  const clearDialog = () => setDialog(initialDialog);

  const handleClickUpdateUserButton = async () => {
    setDialog({
      ...dialog,
      open: true,
      pending: true,
      title: 'Creating boards...'
    });
    await updateUser({
      name,
      email,
      biography,
      image: null
    });
    setDialog({
      ...dialog,
      open: true,
      pending: false,
      title: 'Creation complete.',
      content: ''
    });
  };

  return (
    <StyledWrapDiv>
      <Section
        title='기본 정보 수정'
      >
        <Textfield placeholder='Name'/>
        <Textfield placeholder='Email' errorMessage='Error!!'/>
        <Textfield type='textarea'/>
        <Button
          palette='primary'
          onClick={handleClickUpdateUserButton}
        >
          저장
        </Button>
      </Section>
      <Dialog
        open={dialog.open}
        loader={dialog.pending}
        title={dialog.title}
        content={dialog.content}
        onClickBackdrop={dialog.pending ? undefined : () => clearDialog()}
        onYes={dialog.pending ? undefined : () => clearDialog()}
        yesLabel={t('ok')}
      />
    </StyledWrapDiv>
  );
}

export default UpdateUserBasicInfo;
