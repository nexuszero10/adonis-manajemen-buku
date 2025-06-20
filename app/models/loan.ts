import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Book from './book.js'
import Member from './member.js'
import { DateTime } from 'luxon'

export default class Loan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare memberId: number

  @column()
  declare bookId: number

  @column.date()
  declare loanDate: DateTime

  @column.date()
  declare returnDate: DateTime | null

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @belongsTo(() => Member)
  declare member: BelongsTo<typeof Member>
}
