import { ICreateMasterData } from "../interfaces/ICreateMasterData";
import MasterModel from "../models/master.dal";

class MasterService {
    private masterModel: MasterModel;

    constructor(masterModel: MasterModel) {
        this.masterModel = masterModel;
    }

    async getAllMasters() {
        return await this.masterModel.getAll();
    } 
    
    async getMasterById(id: number) {
        return await this.masterModel.getById(id);
    }

    async updateMaster (id: number, masterData: ICreateMasterData ) {
            const existingMaster = await this.masterModel.getById(id)
    
            if (!existingMaster) {
                throw new Error (`Мастер с ID ${id} не найден`)
            }
    
            return this.masterModel.update(id, masterData);
        }
    
    async deleteMaster (id: number) {
        return this.masterModel.delete(id);
    }
}

export default MasterService;