import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class BookSeeder extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        title: 'Misteri Rumah Tua',
        author: 'Rizky Pratama',
        publishedYear: 2021,
        categoryId: 1,
        shelfId: 3,
      },
      {
        title: 'Jejak Berdarah',
        author: 'Dina Safira',
        publishedYear: 2019,
        categoryId: 1,
        shelfId: 4,
      },
      {
        title: 'Bayangan Malam',
        author: 'Ari Nugraha',
        publishedYear: 2021,
        categoryId: 1,
        shelfId: 3,
      },
      {
        title: 'Logika dan Etika',
        author: 'Imam Santosa',
        publishedYear: 2018,
        categoryId: 2,
        shelfId: 4,
      },
      {
        title: 'Hidup dan Pikiran',
        author: 'Yusuf Arifin',
        publishedYear: 2017,
        categoryId: 2,
        shelfId: 2,
      },
      {
        title: 'Filsafat Timur',
        author: 'Siti Rahmah',
        publishedYear: 2021,
        categoryId: 2,
        shelfId: 4,
      },
      {
        title: 'Riwayat Kerajaan Nusantara',
        author: 'Budi Santoso',
        publishedYear: 2020,
        categoryId: 3,
        shelfId: 3,
      },
      {
        title: 'Revolusi Indonesia',
        author: 'Adi Nugroho',
        publishedYear: 2019,
        categoryId: 3,
        shelfId: 3,
      },
      {
        title: 'Dunia Perang Dunia',
        author: 'Fajar Wirawan',
        publishedYear: 2016,
        categoryId: 3,
        shelfId: 4,
      },
      {
        title: 'Kumpulan Puisi Senja',
        author: 'Larasati',
        publishedYear: 2020,
        categoryId: 4,
        shelfId: 4,
      },
      {
        title: 'Cerita Hati',
        author: 'Nanda Prameswari',
        publishedYear: 2018,
        categoryId: 4,
        shelfId: 2,
      },
      {
        title: 'Lembaran Waktu',
        author: 'Bayu Nugraha',
        publishedYear: 2022,
        categoryId: 4,
        shelfId: 2,
      },
      {
        title: 'Dunia Bayangan',
        author: 'Aria Febrian',
        publishedYear: 2021,
        categoryId: 5,
        shelfId: 5,
      },
      {
        title: 'Kota di Awan',
        author: 'Sari Indah',
        publishedYear: 2020,
        categoryId: 5,
        shelfId: 4,
      },
      {
        title: 'Legenda Kristal Hitam',
        author: 'Raka Dewa',
        publishedYear: 2023,
        categoryId: 5,
        shelfId: 3,
      },
      { title: 'Janji', author: 'Tere Liye', publishedYear: 2023, categoryId: 5, shelfId: 3 },
      { title: 'Ily', author: 'Tere Liye', publishedYear: 2024, categoryId: 5, shelfId: 3 },
    ])
  }
}
