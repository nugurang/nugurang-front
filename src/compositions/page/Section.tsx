import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Text from '@/components/text/Text';
import Card from '@/components/paper/Card';
import Header2 from '@/components/text/Header2';

const Section = styled.section`
`;

const TitleWrap = styled.div`
  margin: 16px;
`;

interface Props {
  children: ReactNode | string;
  title?: string | null;
}
export default (props: Props) => {
  const {
    children,
    title,
  } = props;

  return (
    <Card setMargin={true}>
      <Section>
        {title && (
          <TitleWrap>
            <Header2>{title}</Header2>
          </TitleWrap>
        )}
        {children}
      </Section>
    </Card>
  );
}
