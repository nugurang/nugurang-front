import { GetServerSidePropsContext as _GetServerSidePropsContext } from 'next'

export type IsomorphicGetServerSidePropsContext = _GetServerSidePropsContext | null;

const isServer = typeof window === 'undefined';
const isClient = !isServer;

const IsomorphismManager = {
  isServer,
  isClient
};

export default IsomorphismManager;
