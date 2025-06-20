import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Loan from './loan.js'

export default class Member extends BaseModel {
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

  @hasMany(() => Loan)
  declare loans: HasMany<typeof Loan>
}
