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

import ProviderModel from './models/provider.dal';
import ProviderService from './service/provider.service';
import ProviderController from './controllers/provider.controller';
import providerRoutes from './routes/provider.route';

import AppointmentModel from './models/appointment.dal';
import AppointmentService from './service/appointment.service';
import AppointmentController from './controllers/appointment.controller';
import appointmentRoutes from './routes/appointment.route';

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
 
const clientService = new ClientService(new ClientModel());
const clientController = new ClientController(clientService);

const masterService = new MasterService(new MasterModel());
const masterController = new MasterController(masterService);

const providerService = new ProviderService(new ProviderModel);
const providerController = new ProviderController(providerService)

const appointmentService = new AppointmentService(new AppointmentModel)
const appointmentController = new AppointmentController(appointmentService)

app.use('/api', clientRoutes(clientController))
app.use('/api', masterRoutes(masterController))
app.use('/api', providerRoutes(providerController))
app.use('/api', appointmentRoutes(appointmentController))

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
});
