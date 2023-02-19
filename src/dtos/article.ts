import { ImageDTO } from "./image";

export interface ArticleDTO {
  user: {
    id: string;
    name: string;
  }
  title: string;
  content: string;
  images: ImageDTO[];
  upCount: number;
  downCount: number;
  starCount: number;
}
