import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/quarks/div/Div';
import Section from '@/src/components/Section';
import Textfield from '@/src/components/atoms/textfield/Textfield';
import styled from '@emotion/styled';
import { updateCurrentUser } from '@/src/backend/dao/user';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface FragmentProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
  
  `}
`;

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
/*
    await updateCurrentUser(null, {
      name,
      email,
      biography,
      image: null
    });
*/
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
