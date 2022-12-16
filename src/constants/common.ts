import { GetServerSidePropsContext } from "next";

export type PlainObjectKey = string | symbol;
export type PlainObject = {
  [key: PlainObjectKey]: any
};

export interface GetServerSidePropsContextAdapter {
  context?: GetServerSidePropsContext;
}
