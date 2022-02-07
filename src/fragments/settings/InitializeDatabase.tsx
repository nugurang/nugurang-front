import * as constants from '@/src/constants';

import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';
import { mutateToBackend, queryToBackend } from '@/src/utils/backend';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/base/Div';
import Section from '@/src/components/Section';
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

interface CreateBoardProps {
  name: string;
}
const createBoard = async (props: CreateBoardProps) => {
  await mutateToBackend(null, `
    mutation CreateBoard($board: BoardInput!) {
      createBoard(board: $board) {
        id
        name
      }
    }
  `, {
    board: {
      name: props.name
    }
  });
};

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
      await createBoard({
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
