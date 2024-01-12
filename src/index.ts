import express, { Express } from 'express';
import { router } from './api';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

app.use(express.json());
app.use(router);
app.use(cors());
app.use(helmet());

app.listen(process.env.PORT || 3000);