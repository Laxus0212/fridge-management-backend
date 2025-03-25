import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { IoAdapter } from '@nestjs/platform-socket.io';
// import { ServerOptions } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // const ioAdapter = new IoAdapter(app);
  //
  // // Socket.IO opciók (pl. CORS, path)
  // const serverOptions: Partial<ServerOptions> = {
  //   path: '/socket.io',
  //   cors: {
  //     origin: [
  //       'http://localhost:8100',
  //       'https://accounts.google.com',
  //       'http://localhost',
  //       'https://localhost',
  //       'capacitor://localhost',
  //       'https://varadinas.synology.me',
  //       'http://varadinas.synology.me',
  //     ],
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true,
  //     allowedHeaders: [
  //       'Origin',
  //       'X-Requested-With',
  //       'Content-Type',
  //       'Accept',
  //       'Authorization',
  //     ],
  //     exposedHeaders: ['Authorization'],
  //   },
  // };
  //
  // // "Patch"-eljük a createIOServer metódust
  // const originalCreate = ioAdapter.createIOServer.bind(ioAdapter);
  // ioAdapter.createIOServer = (port, options) =>
  //     originalCreate(port, {...options, ...serverOptions});
  //
  // app.useWebSocketAdapter(ioAdapter);

  //app.useWebSocketAdapter(new IoAdapter());

  AppModule.configure(app);

  app.use((req, res, next) => {
    res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
