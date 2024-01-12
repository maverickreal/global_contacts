import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './data/data';
import { apiController } from './api/controllers';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', apiController);

app.listen(process.env.PORT || 3000);