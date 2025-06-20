import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import Shelf from './shelf.js'
import Loan from './loan.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare author: string

  @column()
  declare publishedYear: number

  @column()
  declare categoryId: number

  @column()
  declare shelfId: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Shelf)
  declare shelf: BelongsTo<typeof Shelf>

  @hasMany(() => Loan)
  declare loans: HasMany<typeof Loan>
}
