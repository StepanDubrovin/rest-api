import express from 'express';
import ProviderController from '../controllers/provider.controller';


export default (providerController: ProviderController) => {
    const router = express.Router();

    router.get('/provider', providerController.getAllProviders);
    router.get('/provider/:id', providerController.getProviderById);
    router.put('/provider/:id', providerController.updateProvider);
    router.delete('/provider/:id', providerController.deleteProvider)

    return router;
}