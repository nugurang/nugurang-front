import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/quarks/div/Div';
import Section from '@/src/components/Section';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface FragmentProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
    margin-top: 16px;
  `}
`;

const TestComponents: React.FC<FragmentProps> = props => {
  const { t } = useTranslation('common');
  
  const initialDialog = {
    open: false
  };
  const [dialog, setDialog] = useState(initialDialog);
  const clearDialog = () => setDialog(initialDialog);

  const handleClickShowTestDialogButton = async () => {
    setDialog({
      ...dialog,
      open: true
    });
  };

  return (
    <StyledWrapDiv>
      <Section
        title='컴포넌트 테스트'
      >
        <Button
          onClick={handleClickShowTestDialogButton}
        >
          대화 상자 열기
        </Button>
      </Section>
      <Dialog
        open={dialog.open}
        loader={true}
        title='테스트 대화 상자'
        content='테스트 대화 상자 컨텐츠'
        onCancel={() => clearDialog()}
        onClickBackdrop={() => clearDialog()}
        cancelLabel='대화 상자 닫기'
      />
    </StyledWrapDiv>
  );
}

export default TestComponents;
