import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('roles', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable()
        })
        .createTable('masters', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('specialization')
        })
        .createTable('clients', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('phone').notNullable();
            table.string('email')
        })
        .createTable('providers', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.decimal('price', 10, 2).notNullable();
            table.text('description');
        })
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
        .dropTableIfExists('providers')
        .dropTableIfExists('clients')
        .dropTableIfExists('masters')
        .dropTableIfExists('roles');
}

