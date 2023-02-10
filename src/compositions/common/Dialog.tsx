import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import Modal from '../../components/layout/Modal';
import Text from '../../components/text/Text';
import Card from '../../components/paper/Card';

const DialogTextBox = styled.div`
  padding: 16px 16px 0 16px;
`;
const DialogButtonBox = styled.div`
  padding: 16px;
`;

const TitleCss = `
  font-size: 24px;
`;

const ContentCss = `
  font-size: 20px;
`;

interface Props {
  children: ReactNode | string;
  title?: string;
  content?: string;
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
      <Card>
        <DialogTextBox>
          <Text
            align='center'
            variant='p'
            css={TitleCss}
          >
            {title}
          </Text>
          <Text
            align='center'
            variant='p'
            css={ContentCss}
          >
            {content}
          </Text>
        </DialogTextBox>
        <DialogButtonBox>
          {children}
        </DialogButtonBox>
      </Card>
    </Modal>
  );
}
