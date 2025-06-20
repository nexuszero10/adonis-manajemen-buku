import Shelf from '#models/shelf'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ShelfSeeder extends BaseSeeder {
  async run() {
    await Shelf.createMany([
      { code: 'A01', location: 'Lantai 1 - Pojok Timur' },
      { code: 'A02', location: 'Lantai 1 - Pojok Barat' },
      { code: 'B01', location: 'Lantai 2 - Tengah' },
      { code: 'B02', location: 'Lantai 2 - Selatan' },
      { code: 'C01', location: 'Lantai 3 - Utara' },
    ])
  }
}
