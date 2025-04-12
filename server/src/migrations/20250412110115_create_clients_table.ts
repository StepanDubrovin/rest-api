import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('clients', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('phone').notNullable();
            table.string('email')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('clients')
}

