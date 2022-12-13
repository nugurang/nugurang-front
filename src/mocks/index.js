const initMockAPI = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
};

const mocks = {
  initMockAPI
};

export default mocks;
