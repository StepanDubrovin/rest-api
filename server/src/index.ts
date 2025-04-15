import express from 'express';
import 'dotenv/config';

import UserModel from './models/user.dal';
import UserService from './service/user.service';
import UserController from './controllers/user.controller';
import useRoutes from './routes/user.route';


import ProviderModel from './models/provider.dal';
import ProviderService from './service/provider.service';
import ProviderController from './controllers/provider.controller';
import providerRoutes from './routes/provider.route';

import AppointmentModel from './models/appointment.dal';
import AppointmentService from './service/appointment.service';
import AppointmentController from './controllers/appointment.controller';
import appointmentRoutes from './routes/appointment.route';
import TokenService from './service/token.service';

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
 
const userService = new UserService(new UserModel(), new TokenService);
const userController = new UserController(userService);


const providerService = new ProviderService(new ProviderModel);
const providerController = new ProviderController(providerService)

const appointmentService = new AppointmentService(new AppointmentModel)
const appointmentController = new AppointmentController(appointmentService)

app.use('/api', useRoutes(userController))
app.use('/api', providerRoutes(providerController))
app.use('/api', appointmentRoutes(appointmentController))

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
});
