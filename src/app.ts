import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import userRouter from "./routers/user-router";
import { handleApplicationErrors } from "./middlewares";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/test', (_req, res) => res.send('OK!'))
app.use('/user', userRouter)
app.use(handleApplicationErrors)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
