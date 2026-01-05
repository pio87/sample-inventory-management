import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { createApp } from './app';
import { env } from './env';
import { AppDataSource } from './config/data-source';


async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    const app = await createApp(AppDataSource);

    app.listen(env.PORT, () => {
      console.log(`Listening on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Startup error", error);
    process.exit(1);
  }
}

bootstrap();
