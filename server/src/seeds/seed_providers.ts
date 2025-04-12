import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("providers").del();

    // Inserts seed entries
    await knex("providers").insert([
        { 
            id: 1, 
            name: 'Замена масла', 
            price: 1500.00, 
            description: 'Полная замена масла и фильтров' 
        },
        { 
            id: 2, 
            name: 'Диагностика двигателя', 
            price: 2000.00, 
            description: 'Комплексная диагностика двигателя' 
        },
        { 
            id: 3, 
            name: 'Ремонт подвески', 
            price: 5000.00, 
            description: 'Замена амортизаторов, стоек и рычагов' 
        }
    ]);
};
