import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import Modal from '../../components/layout/Modal';
import Card from '../../components/paper/Card';
import Box from '@/components/layout/Box';

const DialogTextBox = styled.div`
  padding: 16px 16px 0 16px;
`;

const DialogButtonBox = styled.div`
  padding: 16px;
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: props.theme.default.contrastText;
`;

const ContentText = styled.p`
  font-size: 20px;
`;

interface Props {
  children: ReactNode | string;
  title?: string | null;
  content?: string | null;
  dimmed?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  open: boolean;
  onClickBackdrop?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    title,
    content,
    dimmed,
    open,
    onClickBackdrop,
  } = props;

  return (
    <Modal
      dimmed={dimmed}
      open={open}
      onClickBackdrop={onClickBackdrop}
    >
      <Card
        minWidth='min(368px, 100vw)'
      >
        <DialogTextBox>
          <Box centerizeHorizontally>
            <TitleText>
              {title}
            </TitleText>
            <ContentText>
              {content}
            </ContentText>
          </Box>
        </DialogTextBox>
        <DialogButtonBox>
          {children}
        </DialogButtonBox>
      </Card>
    </Modal>
  );
}
