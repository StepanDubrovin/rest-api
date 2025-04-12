import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clients").del();

    // Inserts seed entries
    await knex("clients").insert([
        { 
            id: 1, 
            name: 'Алексей Кузнецов', 
            phone: '+79221234567', 
            email: 'alex@example.com' 
        },
        { 
            id: 2, 
            name: 'Мария Белова', 
            phone: '+79227654321', 
            email: 'maria@example.com' 
        },
        { 
            id: 3, 
            name: 'Олег Романов', 
            phone: '+79031239876', 
            email: null 
        }
    ]);
};
