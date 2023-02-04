import { GetServerSidePropsContext } from "next";

export type PlainObjectKey = string | symbol;
export type PlainObject = {
  [key: PlainObjectKey]: any
};

export interface GetServerSidePropsContextAdapter {
  context?: GetServerSidePropsContext;
}

export const wallpaperSourceUrl = 'https://source.unsplash.com/random/1920x1080/?crowd';
