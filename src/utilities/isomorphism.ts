const isServer = typeof window === 'undefined';
const isClient = !isServer;

const IsomorphismUtilities = {
  isServer,
  isClient
};

export default IsomorphismUtilities;
