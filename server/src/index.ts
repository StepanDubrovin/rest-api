import express from 'express';
import 'dotenv/config';

import ClientModel from './models/client.dal';
import ClientService from './service/client.service';
import ClientController from './controllers/client.controller';
import clientRoutes from './routes/client.route';

import MasterModel from './models/master.dal';
import MasterService from './service/master.service';
import MasterController from './controllers/master.controller';
import masterRoutes from './routes/master.route';

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
 
const clientService = new ClientService(new ClientModel());
const clientController = new ClientController(clientService);

const masterService = new MasterService(new MasterModel());
const masterController = new MasterController(masterService);

app.use('/api', clientRoutes(clientController))
app.use('/api', masterRoutes(masterController))

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
});
