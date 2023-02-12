import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import Modal from '../../components/layout/Modal';
import Card from '../../components/paper/Card';
import Box from '@/components/layout/Box';
import Text from '@/components/text/Text';

const DialogTextBox = styled.div`
  padding: 16px 16px 0 16px;
`;

const DialogButtonBox = styled.div`
  padding: 16px;
`;

const TitleTextCss = `
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: props.theme.default.contrastText;
`;

const ContentTextCss = `
  display: block;
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
            <Text css={TitleTextCss}>
              {title}
            </Text>
            <Text css={ContentTextCss}>
              {content}
            </Text>
          </Box>
        </DialogTextBox>
        <DialogButtonBox>
          {children}
        </DialogButtonBox>
      </Card>
    </Modal>
  );
}
