import Logger from '@/utilities/common/logger';
import { createServer } from '@mswjs/http-middleware';
import handlers from './handlers';

const httpServer = createServer(...handlers);
const port = process.env.NEXT_PUBLIC_URI_BACKEND_PORT ?? 8080;

httpServer.listen(port);
Logger.debug(`MSW custom server is started on port ${port}.`);
