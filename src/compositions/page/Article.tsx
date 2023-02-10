import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Text from '@/components/text/Text';

const Article = styled.article`
`;

const TitleWrap = styled.div`
  margin: 16px;
`;

interface ContentWrapProps {
  setMargin?: boolean;
}
const ContentWrap = styled.div<ContentWrapProps>`
  margin: ${props => props.setMargin ? '16px' : '0'};
`;

interface Props {
  children: ReactNode | string;
  title?: string | null;
  setMargin?: boolean;
}
export default (props: Props) => {
  const {
    children,
    title,
    setMargin,
  } = props;

  return (
    <Article>
      {title && (
        <TitleWrap>
          <Text variant='h3'>{title}</Text>
        </TitleWrap>
      )}
      <ContentWrap setMargin={setMargin ?? true}>
        {children}
      </ContentWrap>
    </Article>
  );
}
