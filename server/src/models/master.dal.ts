import db from "../db";
import { ICreateMasterData } from "../interfaces/ICreateMasterData";
import { ApiError } from "../exceptions/api_errors";

class MasterModel {
    async create(masterData: ICreateMasterData) {
        try {
            const query = db('masters');
            await query.insert(masterData)
        } catch (err) {
            console.error('Error creating master', err);
            throw err;
        }
    }
    async getById(id: number) {
        try {
            const query = db('masters');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching master by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)]
            ApiError.BadConnectToDB(errorArray)
        }
    }
    async getAll() {
        try {
            const query = db('masters');
            return await query.select('*');
        } catch (err) {
            console.error('Error fetching all masters', err)
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            ApiError.BadConnectToDB(errorArray);
        }
    }
    async update (id: number, masterData: ICreateMasterData) {
        try {
            const query = db('masters');
            return await query.where('id', id).update({
                name: masterData.name,
                specialization: masterData.specialization
            });
        } catch (err) {
            console.error('Error updating master by id', err) 
            throw err;
        }
    }
    async delete(id: number) {
        try {
            const query = db('masters');
            await query.where('id', id).delete();
        } catch(err) {
            console.error('Error delete master by id', err) 
            throw err;
        }
    }
}

export default MasterModel;

