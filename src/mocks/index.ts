import IsomorphismManager from '@/utilities/common/isomorphism';

const initMockAPI = async () => {
  if (IsomorphismManager.isServer) {
    /*
    ** msw 오류로 인해 server가 동작하지 않는 것으로 판단되어,
    ** @mswjs/http-middleware 패키지를 이용한 custom server로 대체함
    */
    // const { server } = await import('./server');
    // server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
};

export {
  initMockAPI
};
