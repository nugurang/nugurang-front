import { MouseEventHandler, ReactNode, useContext } from 'react';
import Card from '@/components/paper/Card';
import Image from '@/components/graphic/Image';
import styled from '@emotion/styled';
import { Theme, ThemeContext } from '@/components/theme';
import Multistage from '@/components/layout/Multistage';
import Header2 from '@/components/text/Header2';

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

interface StyledMultistageProps {
}
const StyledMultistage = styled(Multistage)<StyledMultistageProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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

interface Props {
  children: ReactNode | string;
  imageUrl?: string;
  title?: string | null;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    imageUrl,
    title,
  } = props;
  const { theme } = useContext(ThemeContext);
 
  return (
    <Card>
      <StyledMultistage stage={2}>
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
      </StyledMultistage>
    </Card>
  );
}
