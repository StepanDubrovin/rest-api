import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('providers', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.decimal('price', 10, 2).notNullable();
            table.text('description');
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('providers')
}

