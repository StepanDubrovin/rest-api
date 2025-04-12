import e, {Request, Response, NextFunction } from 'express';
import ClientService from '../service/client.service';
import { ApiError } from '../exceptions/api_errors';

class ClientController {

    private clientService: ClientService;

    constructor(clientService: ClientService) {
        this.clientService = clientService;
    }

    getAllClients = async (req: any, res: Response, next: NextFunction ) => {
        try {
            const clients = await this.clientService.getAllClients();

            if (clients) {
                res.status(200).json(clients);
            } else {
                return next(
                    ApiError.NotFound('Клиенты не найдены')
                );
            }
        } catch (e) {
            next(e);
        }
    }

    getClientById = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const client_id = parseInt(req.params.id, 10);
            const client = await this.clientService.getClientById(client_id);

            if (client) {
                res.status(200).json(client);
            } else {
                return next (
                    ApiError.NotFound('Клиент не найден')
                );
            }
        } catch (e) {
            next(e);
        }
    }
    updateClient = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const client_id = parseInt(req.params.id, 10);
            
            const updateClient = await this.clientService.updateClient(
                client_id, 
                req.body
            );

            if (updateClient) {
                res.status(200).json(updateClient);
            } else {
                return next(ApiError.NotFound('Клиент не найден'));
            }
        } catch (e) {
            next(e);
        }
    }
    deleteClient = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const client_id = parseInt(req.params.id, 10);
            await this.clientService.deleteClient(
                client_id,
            )
            res.status(200).json('Клиент успешно удален');
        } catch (e) {
            next(e);
        }
    }


}

export default ClientController;