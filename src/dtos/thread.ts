import { ArticleDTO } from "./article";

export interface ThreadDTO {
  id: string;
  name: string;
  firstArticle: ArticleDTO;
}
