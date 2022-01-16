import { gql } from '@apollo/client';

export class CreateArticleMutationBuilder {

  build() {
    return gql`
      mutation CreateArticle($article: ArticleInput!, $thread: ID!, $parent: ID) {
        createArticle(article: $article, thread: $thread, parent: $parent) {
          id
          title
        }
      }
    `;
  }

}
