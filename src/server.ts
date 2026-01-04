import 'reflect-metadata';
import { createApp } from './app';
import { env } from './env';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';

const port = env.PORT;
dotenv.config();

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
//
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Database connected");
//
//     const server = app.listen(port, () => {
//       console.log(`Listening: http://localhost:${port}`);
//     });
//
//
//     server.on("error", (err) => {
//       if ("code" in err && err.code === "EADDRINUSE") {
//         console.error(`Port ${env.PORT} is already in use. Please choose another port or stop the process using it.`);
//       }
//       else {
//         console.error("Failed to start server:", err);
//       }
//       process.exit(1);
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection error", error);
//     process.exit(1);
//   });

