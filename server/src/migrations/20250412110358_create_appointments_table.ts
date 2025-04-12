import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('appointments', function (table) {
            table.increments('id').primary();
            table.integer('client_id').references('id')
                .inTable('clients').onDelete('CASCADE');
            table.integer('master_id').references('id')
                .inTable('masters').onDelete('CASCADE');
            table.integer('provider_id').nullable().references('id')
                .inTable('providers').onDelete('SET NULL');
            table.timestamp('appointment_date').notNullable();
            table.string('status').defaultTo('pending');
            table.text('notes')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('appointments')
}

