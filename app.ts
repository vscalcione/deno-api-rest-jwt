import { Application, Router, Status } from 'https://deno.land/x/oak/mod.ts';
import { AppHost, AppPort } from './config/config.ts';
import { DatabaseController } from './controllers/Database.ts';
import { UserRoutes, PrivateRoutes } from './routers/index.ts';
import { logger } from './middlewares/logger.ts';

const app = new Application();
const router = new Router();

// Logger
app.use(logger);

const userRoutes = UserRoutes(router);
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

const privateRoutes = PrivateRoutes(router);
app.use(privateRoutes.routes());
app.use(privateRoutes.allowedMethods());

await new DatabaseController().initModels();
const host = `${AppHost}:${AppPort}`;

await app.listen(host);
console.log(`Deno started at ${host}`);