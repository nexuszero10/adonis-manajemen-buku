import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    await Category.createMany([
      { name: 'Thiler' },
      { name: 'Filsafat' },
      { name: 'Sejarah' },
      { name: 'Sastra' },
      { name: 'Fantasi' },
    ])
  }
}
