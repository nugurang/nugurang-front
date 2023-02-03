import { GetServerSidePropsContext } from 'next'

export type IsomorphicGetServerSidePropsContext = GetServerSidePropsContext | null;

const isServer = typeof window === 'undefined';
const isClient = !isServer;

const IsomorphismManager = {
  isServer,
  isClient
};

export default IsomorphismManager;
