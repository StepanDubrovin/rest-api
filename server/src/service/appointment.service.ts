import AppointmentModel from "../models/appointment.dal";
import { IAppointmentsData } from "../interfaces/IAppointmentsData";

class AppointmentService {
    private appointmentModel: AppointmentModel;

    constructor(appointmentModel: AppointmentModel) {
        this.appointmentModel = appointmentModel;
    }

    async getAllAppointments() {
        return await this.appointmentModel.getAll();
    }

    async getAppointmentById(id: number) {
        return await this.appointmentModel.getById(id);
    }

    async updateAppointment (id: number, appointmentData: IAppointmentsData ) {
        const existingAppointment = await this.appointmentModel.getById(id)

        if (!existingAppointment) {
            throw new Error (`Запись на ремонт с ID ${id} не найдена`)
        }

        return this.appointmentModel.update(id, appointmentData);
    }

    async deleteAppointment (id: number) {
        return this.appointmentModel.delete(id);
    }
}

export default AppointmentService;