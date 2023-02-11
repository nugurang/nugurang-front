import { GetServerSidePropsContext } from "next";

export type PlainObjectKey = string | symbol;
export type PlainObject = {
  [key: PlainObjectKey]: any
};

export interface GetServerSidePropsContextAdapter {
  context?: GetServerSidePropsContext;
}

interface GetImageUrlProps {
  height?: number;
  width?: number;
  keyword?: string;
}
export const getImageUrl = (props: GetImageUrlProps) => {
  const {
    height = 1920,
    width = 1080,
    keyword = ''
  } = props;
  return `
    https://source.unsplash.com/random/${height}x${width}/?${keyword}
  `;
};

export const FALLBACK_IMAGE_URL = 'https://i.kym-cdn.com/entries/icons/mobile/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg';
