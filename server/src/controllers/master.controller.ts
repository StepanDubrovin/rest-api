import MasterService from "../service/master.service";
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api_errors';

class MasterController {
    private masterService: MasterService;

    constructor(masterService: MasterService) {
        this.masterService = masterService;
    }

    getAllMasters = async(req: any, res: Response, next: NextFunction) => {
        try {
            const masters = await this.masterService.getAllMasters();

            if(masters) {
                res.status(200).json(masters);
            } else {
                return next (
                    ApiError.NotFound('Мастер не найден')
                )
            }
        } catch (e) {
            next(e);
        }
    }
    getMasterById = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const master_id = parseInt(req.params.id, 10);
            const master = await this.masterService.getMasterById(master_id);

            if (master) {
                res.status(200).json(master);
            } else {
                return next (
                    ApiError.NotFound('Мастер не найден')
                );
            }
        } catch (e) {
            next(e);
        }
    }

    updateMaster = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const master_id = parseInt(req.params.id, 10);
            
            const updateMaster = await this.masterService.updateMaster(
                master_id, 
                req.body
            );

            if (updateMaster) {
                res.status(200).json(updateMaster);
            } else {
                return next(ApiError.NotFound('Мастер не найден'));
            }
        } catch (e) {
            next(e);
        }
    }
    deleteMaster = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const master_id = parseInt(req.params.id, 10);
            await this.masterService.deleteMaster(
                master_id,
            )
            res.status(200).json('Мастер успешно удален');
        } catch (e) {
            next(e);
        }
    }
}

export default MasterController;