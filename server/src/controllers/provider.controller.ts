import ProviderService from '../service/provider.service';
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api_errors';

class ProviderController {
    private providerService: ProviderService;

    constructor(providerService: ProviderService) {
        this.providerService = providerService;
    }

    getAllProviders = async(req: any, res: Response, next: NextFunction) => {
        try {
            const providers = await this.providerService.getAllProviders();

            if(providers) {
                res.status(200).json(providers);
            } else {
                return next (
                    ApiError.NotFound('Услуга не найдена')
                )
            }
        } catch (e) {
            next(e);
        }
    }
    getProviderById = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const provider_id = parseInt(req.params.id, 10);
            const provider = await this.providerService.getProviderById(provider_id);

            if (provider) {
                res.status(200).json(provider);
            } else {
                return next (
                    ApiError.NotFound('Услуга не найдена')
                );
            }
        } catch (e) {
            next(e);
        }
    }

    updateProvider = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const provider_id = parseInt(req.params.id, 10);
            
            const updateProvider = await this.providerService.updateProvider(
                provider_id, 
                req.body
            );

            if (updateProvider) {
                res.status(200).json(updateProvider);
            } else {
                return next(ApiError.NotFound('Услуга не найдена'));
            }
        } catch (e) {
            next(e);
        }
    }
    deleteProvider = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const provider_id = parseInt(req.params.id, 10);
            await this.providerService.deleteProvider(
                provider_id,
            )
            res.status(200).json('Услуга успешно удалена');
        } catch (e) {
            next(e);
        }
    }
}

export default ProviderController;