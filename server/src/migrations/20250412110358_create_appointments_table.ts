import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('appointments', function (table) {
            table.increments('id').primary();

            table.integer('client_id').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
    
            table.integer('master_id').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
    
            table.integer('provider_id').unsigned().nullable()
                .references('id').inTable('providers').onDelete('SET NULL');
    
            table.enu('status', ['В ожидании', 'Подтверждено', 'В работе', 'Завершено', 'Отменено' ])
                .defaultTo('В ожидании').notNullable();
            table.text('notes').nullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('appointments')
}

