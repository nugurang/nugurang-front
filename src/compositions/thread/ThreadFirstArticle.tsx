import { ArticleDTO } from '@/dtos/article';
import Card from '@/components/paper/Card';
import ThreadArticleBase from './ThreadArticleBase';

interface Props {
  article: ArticleDTO;
  onClickThumbsUpButton?: (article: ArticleDTO) => void;
  onClickThumbsDownButton?: (article: ArticleDTO) => void;
  onClickStarButton?: (article: ArticleDTO) => void;
}
export default (props: Props) => {
  const {
    article,
    onClickThumbsUpButton,
    onClickThumbsDownButton,
    onClickStarButton,
  } = props;
 
  return (
    <Card>
      <ThreadArticleBase
        article={article}
        onClickThumbsUpButton={onClickThumbsUpButton}
        onClickThumbsDownButton={onClickThumbsDownButton}
        onClickStarButton={onClickStarButton}
      />
    </Card>
  );
}
