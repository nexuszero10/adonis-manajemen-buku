import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('nim').unique().notNullable()
      table.text('address').nullable()
      table.string('phone').nullable()
      table.enum('role', ['staff', 'borrower']).notNullable().defaultTo('borrower')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
