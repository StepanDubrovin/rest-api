import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('phone').notNullable();
            table.string('email').unique().notNullable();;
            table.string('password', 255).notNullable();
            table.enu('role', ['Администратор', 'Клиент', 'Мастер']).defaultTo('Клиент').notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('users')
}

