import ClientModel from "../models/client.dal";
import { ICreateClientData } from "../interfaces/ICreateClientData";

class ClientService {
    private clientModel: ClientModel;

    constructor(clientModel: ClientModel) {
        this.clientModel = clientModel;
    }

    async getAllClients() {
        return await this.clientModel.getAll();
    }

    async getClientById(id: string) {
        return await this.clientModel.getById(id);
    }

    async updateClient (id: string, clientData: ICreateClientData ) {
        const existingClient = await this.clientModel.getById(id)

        if (!existingClient) {
            throw new Error (`Клиент с ID ${id} не найден`)
        }

        return this.clientModel.update(id, clientData);
    }

    async deleteClient (id: string) {
        return this.clientModel.delete(id);
    }
}

export default ClientService;