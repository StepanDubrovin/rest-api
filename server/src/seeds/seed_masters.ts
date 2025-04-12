import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("masters").del();

    // Inserts seed entries
    await knex("masters").insert([
        { 
            id: 1, 
            name: 'Иван Иванов', 
            specialization: 'Электрика' 
        },
        { 
            id: 2, 
            name: 'Пётр Петров', 
            specialization: 'Диагностика' 
        },
        { 
            id: 3, 
            name: 'Анна Смирнова', 
            specialization: 'Кузовной ремонт' 
        }
    ]);
};
