import { IProviderData } from "../interfaces/IProviderData";
import ProviderModel from "../models/provider.dal";

class ProviderService {
    private providerModel: ProviderModel;

    constructor(providerModel: ProviderModel) {
        this.providerModel = providerModel;
    }

    async getAllProviders() {
        return await this.providerModel.getAll();
    } 
    
    async getProviderById(id: number) {
        return await this.providerModel.getById(id);
    }

    async updateProvider (id: number, providerData: IProviderData ) {
            const existingProvider = await this.providerModel.getById(id)
    
            if (!existingProvider) {
                throw new Error (`Услуга с ID ${id} не найдена`)
            }
    
            return this.providerModel.update(id, providerData);
        }
    
    async deleteProvider (id: number) {
        return this.providerModel.delete(id);
    }
}

export default ProviderService;