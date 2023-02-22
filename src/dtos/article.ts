import { ImageDTO } from "./image";

export interface ArticleDTO {
  id: string;
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
