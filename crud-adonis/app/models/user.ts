import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Loan from './loan.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare nim: string

  @column()
  declare address: string | null

  @column()
  declare phone: string | null

  @column()
  declare role: 'staff' | 'borrower'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Loan)
  declare loans: HasMany<typeof Loan>
}
