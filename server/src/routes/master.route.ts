import express from 'express';
import MasterController from '../controllers/master.controller';


export default (masterController: MasterController) => {
    const router = express.Router();

    router.get('/master', masterController.getAllMasters);
    router.get('/master/:id', masterController.getMasterById);
    router.put('/master/:id', masterController.updateMaster);
    router.delete('/master/:id', masterController.deleteMaster)

    return router;
}