import express from 'express';
import ClientController from '../controllers/client.controller';


export default (clientController: ClientController) => {
    const router = express.Router();

    router.get('/client', clientController.getAllClients);
    router.get('/client/:id', clientController.getClientById);
    router.put('/client/:id', clientController.updateClient);
    router.delete('/client/:id', clientController.deleteClient)

    return router;
}