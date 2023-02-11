import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Card from '@/components/paper/Card';
import Header2 from '@/components/text/Header2';
import Icon from '@/components/graphic/Icon';
import { useRouter } from 'next/router';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';

const Section = styled.section`
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px;
`;

interface Props {
  children: ReactNode | string;
  backButton?: boolean;
  title?: string | null;
}
export default (props: Props) => {
  const {
    children,
    backButton = true,
    title,
  } = props;
  const router = useRouter();
  const handleClickBackButton = () => router.back();

  return (
    <Card setMargin={true}>
      <Section>
        {(backButton || title) && (
          <SectionHeader>
            {backButton && (
              <ButtonGroup>
                {backButton && (
                  <Button
                    setPadding={false}
                    fillVariant='text'
                    onClick={handleClickBackButton}
                  >
                    <Icon type='fas' keyword='arrow-left' />
                  </Button>
                )}
              </ButtonGroup>
            )}
            {title && (
              <Header2>{title}</Header2>
            )}
          </SectionHeader>
        )}
        {children}
      </Section>
    </Card>
  );
}
