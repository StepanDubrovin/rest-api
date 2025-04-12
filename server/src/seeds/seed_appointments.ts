import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("appointments").del();

    // Inserts seed entries
    await knex("appointments").insert([
        {
            id: 1,
            client_id: 1,
            master_id: 2,
            provider_id: 2,
            appointment_date: new Date('2025-04-15T10:00:00'),
            status: 'pending',
            notes: 'Попросил проверить свечи зажигания'
          },
          {
            id: 2,
            client_id: 2,
            master_id: 1,
            provider_id: 1,
            appointment_date: new Date('2025-04-16T14:30:00'),
            status: 'confirmed',
            notes: ''
          },
          {
            id: 3,
            client_id: 3,
            master_id: 3,
            provider_id: null,
            appointment_date: new Date('2025-04-17T09:00:00'),
            status: 'pending',
            notes: 'Подозрение на стук в подвеске'
          }
    ]);
};
