import {Request, Response, NextFunction } from 'express';
import AppointmentService from '../service/appointment.service';
import { ApiError } from '../exceptions/api_errors';

class AppointmentController {

    private appointmentService: AppointmentService;

    constructor(appointmentService: AppointmentService) {
        this.appointmentService = appointmentService;
    }

    getAllAppointments = async (req: any, res: Response, next: NextFunction ) => {
        try {
            const appointments = await this.appointmentService.getAllAppointments();

            if (appointments) {
                res.status(200).json(appointments);
            } else {
                return next(
                    ApiError.NotFound('Записи на ремонт не найдены')
                );
            }
        } catch (e) {
            next(e);
        }
    }

    getAppointmentById = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const appointment_id = parseInt(req.params.id, 10);
            const appointment = await this.appointmentService.getAppointmentById(appointment_id);

            if (appointment) {
                res.status(200).json(appointment);
            } else {
                return next (
                    ApiError.NotFound('Запись на ремонт не найдена')
                );
            }
        } catch (e) {
            next(e);
        }
    }
    updateAppointment = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const appointment_id = parseInt(req.params.id, 10);
            
            const updateAppointment = await this.appointmentService.updateAppointment(
                appointment_id, 
                req.body
            );

            if (updateAppointment) {
                res.status(200).json(updateAppointment);
            } else {
                return next(ApiError.NotFound('Запись на ремонт не найдена'));
            }
        } catch (e) {
            next(e);
        }
    }
    deleteAppointment = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            const appointment_id = parseInt(req.params.id, 10);
            await this.appointmentService.deleteAppointment(
                appointment_id,
            )
            res.status(200).json('Запись на ремонт успешно удалена');
        } catch (e) {
            next(e);
        }
    }


}

export default AppointmentController;
