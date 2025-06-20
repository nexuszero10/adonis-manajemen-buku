import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable('books', (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.integer('published_year').notNullable()
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.integer('shelf_id').unsigned().references('shelves.id').onDelete('CASCADE')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
