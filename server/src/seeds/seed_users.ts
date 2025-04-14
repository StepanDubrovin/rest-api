import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            name: 'Алексей Кузнецов', 
            phone: '+79221234567', 
            email: 'alex@example.com',
            password: 'password111',
            role: 'Клиент'
        },
        { 
            name: 'Мария Белова', 
            phone: '+79227654321', 
            email: 'maria@example.com',
            password: 'password222',
            role: 'Администратор'
        },
        { 
            name: 'Олег Романов', 
            phone: '+79031239876', 
            email: 'olega@example.com',
            password: 'password333',
            role: 'Мастер'
        }
    ]);
};
