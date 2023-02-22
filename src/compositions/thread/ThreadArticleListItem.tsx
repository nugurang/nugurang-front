import { MouseEventHandler } from 'react';
import { ArticleDTO } from '@/dtos/article';
import Card from '@/components/paper/Card';
import ThreadArticleBase from './ThreadArticleBase';

interface Props {
  article: ArticleDTO;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    article,
  } = props;
 
  return (
    <Card>
      <ThreadArticleBase article={article} />
    </Card>
  );
}
