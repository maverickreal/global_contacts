import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './data/data';
import controller from './api/controller/controller';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', controller);

app.listen(process.env.PORT);