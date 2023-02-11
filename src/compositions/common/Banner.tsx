import { MouseEventHandler, ReactNode, useContext } from 'react';
import Card from '@/components/paper/Card';
import Image from '@/components/graphic/Image';
import styled from '@emotion/styled';
import ButtonGroup from '@/components/button/ButtonGroup';
import Button from '@/components/button/Button';
import { Theme, ThemeContext } from '@/components/theme';
import Multistage from '@/components/layout/Multistage';
import Header2 from '@/components/text/Header2';
import Icon from '@/components/graphic/Icon';
import { useRouter } from 'next/router';

interface ImageWrapProps {
  theme: Theme;
}
const ImageWrap = styled.div<ImageWrapProps>`
  position: relative;
  height: 160px;
`;

interface ContentWrapProps {
  theme: Theme;
}
const ContentWrap = styled.div<ContentWrapProps>`
  display: flex;
  flex-direction: column;

  &>*:first-child {
    flex-grow: 1;
  }
`;

interface TitleWrapProps {
  theme: Theme;
}
const TitleWrap = styled.div<TitleWrapProps>`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

interface ChildrenWrapProps {
  theme: Theme;
}
const ChildrenWrap = styled.div<ChildrenWrapProps>`
  margin-top: 8px;

  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

const BannerBackButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  position: absolute;
  top: 0;
  left: 0;
  
  margin: 16px;
`;

interface Props {
  children: ReactNode | string;
  backButton?: boolean;
  imageUrl?: string;
  title?: string | null;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    backButton,
    imageUrl,
    title,
  } = props;
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleClickBackButton = () => router.back();
 
  return (
    <Card>
      <Multistage stage={2} minWidth='240px'>
        {imageUrl && (
          <ImageWrap theme={theme}>
            <Image
              src={imageUrl}
              alt=''
              absolutelytFullSize
            />
          </ImageWrap>
        )}
        <ContentWrap theme={theme}>
          {title && (
            <TitleWrap theme={theme}>
              <Header2 palette='default' align='left'>
                {title}
              </Header2>
            </TitleWrap>
          )}
          <ChildrenWrap theme={theme}>
            {children}
          </ChildrenWrap>
        </ContentWrap>
      </Multistage>
      {(backButton) && (
        <BannerBackButtonWrap>
          <ButtonGroup>
            {backButton && (
              <Button
                setPadding={false}
                fillVariant='filled'
                onClick={handleClickBackButton}
              >
                <Icon type='fas' keyword='arrow-left' />
              </Button>
            )}
          </ButtonGroup>
        </BannerBackButtonWrap>
      )}
    </Card>
  );
}
