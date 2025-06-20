import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'loans'

  async up() {
    this.schema.createTable('loans', (table) => {
      table.increments('id')
      table.integer('member_id').unsigned().references('members.id').onDelete('CASCADE')
      table.integer('book_id').unsigned().references('books.id').onDelete('CASCADE')
      table.date('loan_date').notNullable()
      table.date('return_date').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
