import { useContext } from 'react';
import Image from '@/components/graphic/Image';
import styled from '@emotion/styled';
import ButtonGroup from '@/components/button/ButtonGroup';
import Button from '@/components/button/Button';
import { Theme, ThemeContext } from '@/components/theme';
import Header2 from '@/components/text/Header2';
import { useRouter } from 'next/router';
import Paragraph from '@/components/text/Paragraph';
import { ArticleDTO } from '@/dtos/article';
import Text from '@/components/text/Text';
import Avatar from '@/components/button/Avatar';

interface AuthorWrapProps {
}
const AuthorWrap = styled.div<AuthorWrapProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

interface ImageWrapProps {
  theme: Theme;
}
const ImageWrap = styled.div<ImageWrapProps>`
  position: relative;
  height: 160px;
`;

interface TitleWrapProps {
  theme: Theme;
}
const TitleWrap = styled.div<TitleWrapProps>`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

interface ContentWrapProps {
  theme: Theme;
}
const ContentWrap = styled.div<ContentWrapProps>`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

const ActionWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 16px;
`;

interface Props {
  article: ArticleDTO;
}
export default (props: Props) => {
  const {
    article,
  } = props;
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleClickThumbsUpButton = () => router.back();
  const handleClickThumbsDownButton = () => router.back();
 
  return (
    <>
      <AuthorWrap>
        <Avatar size={'32px'} />
        <Text palette='default' align='left'>
          {article.user.name}
        </Text>
      </AuthorWrap>
      {article.title && (
        <TitleWrap theme={theme}>
          <Header2 palette='default' align='left'>
            {article.title}
          </Header2>
        </TitleWrap>
      )}
      {article.images && (
        <ImageWrap theme={theme}>
          <Image
            src={article.images[0].address}
            alt=''
            absolutelytFullSize
          />
        </ImageWrap>
      )}
      {article.content && (
        <ContentWrap theme={theme}>
          <Paragraph palette='default' align='left'>
            {article.content}
          </Paragraph>
        </ContentWrap>
      )}
      <ActionWrap>
        <ButtonGroup>
          <Button
            icon={{
              type: 'fas',
              keyword: 'thumbs-up',
            }}
            fillVariant='filled'
            onClick={handleClickThumbsUpButton}
          >
            {article.upCount > 0 ? (article.upCount ?? NaN) : '좋아요'}
          </Button>
          <Button
            icon={{
              type: 'fas',
              keyword: 'thumbs-down',
            }}
            fillVariant='filled'
            onClick={handleClickThumbsDownButton}
          >
            {article.downCount > 0 ? (article.downCount ?? NaN) : '싫어요'}
          </Button>
          <Button
            icon={{
              type: 'fas',
              keyword: 'star',
            }}
            fillVariant='filled'
            onClick={handleClickThumbsUpButton}
          >
            {article.starCount > 0 ? (article.upCount ?? NaN) : '찜하기'}
          </Button>
        </ButtonGroup>
      </ActionWrap>
    </>
  );
}
