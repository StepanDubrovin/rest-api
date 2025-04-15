export interface IAppointmentsData {
    id: number;
    client_id: number;
    master_id: number;
    provider_id?: number | null;
    appointment_date: string; 
    status: 'pending' | 'confirmed' | 'cancelled' | string; 
    notes?: string;
}