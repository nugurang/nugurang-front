import * as constants from '@/src/constants';

import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/quarks/div/Div';
import Section from '@/src/components/Section';
import { createBoard } from '@/src/backend/dao/board';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface FragmentProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
  
  `}
`;

const InitializeDatabase: React.FC<FragmentProps> = props => {
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

  const handleClickCreateBoardButton = async () => {
    setDialog({
      ...dialog,
      open: true,
      pending: true,
      title: 'Creating boards...'
    });
    for (const name of constants.COMMON_BOARD_NAMES) {
      setDialog({
        ...dialog,
        content: name
      });
      await createBoard(null, {
        name
      });
    };
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
        title='Create boards'
      >
        <Button
          onClick={handleClickCreateBoardButton}
        >
          Create Boards
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

export default InitializeDatabase;
