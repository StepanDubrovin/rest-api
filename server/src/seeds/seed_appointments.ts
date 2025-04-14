import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("appointments").del();

    // Inserts seed entries
    await knex("appointments").insert([
        {
            client_id: 1,
            master_id: 2,
            provider_id: 2,
            status: 'В ожидании',
            notes: 'Попросил проверить свечи зажигания'
          },
          {
            client_id: 2,
            master_id: 1,
            provider_id: 1,
            status: 'Подтверждено',
            notes: ''
          },
          {
            client_id: 3,
            master_id: 3,
            provider_id: null,
            status: 'В ожидании',
            notes: 'Подозрение на стук в подвеске'
          }
    ]);
};
