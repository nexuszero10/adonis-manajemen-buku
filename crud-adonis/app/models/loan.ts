import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Book from './book.js'
import User from './user.js'
import { DateTime } from 'luxon'

export default class Loan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare bookId: number

  @column.date()
  declare loanDate: DateTime

  @column.date()
  declare returnDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
