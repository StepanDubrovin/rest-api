import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('masters', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('specialization')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('masters')
}

