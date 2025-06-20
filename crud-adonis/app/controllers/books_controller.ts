import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import Category from '#models/category'
import Shelf from '#models/shelf'
import { createBookValidator, updateBookValidator } from '#validators/book'

export default class BooksController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10

    const books = await Book.query()
      .if(search, (query) => {
        query.where('title', 'like', `%${search}%`).orWhere('author', 'like', `%${search}%`)
      })
      .preload('category')
      .preload('shelf')
      .paginate(page, limit)

    return view.render('books/index', {
      books,
      search,
    })
  }

  async create({ view }: HttpContext) {
    const categories = await Category.all()
    const shelves = await Shelf.all()
    return view.render('books/create', { categories, shelves })
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createBookValidator)
      await Book.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Buku berhasil ditambahkan!',
      })
      return response.redirect().toRoute('books.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async show({ params, view }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('category')
      .preload('shelf')
      .firstOrFail()

    return view.render('books/show', { book })
  }

  async edit({ params, view }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const categories = await Category.all()
    const shelves = await Shelf.all()

    return view.render('books/edit', {
      book,
      categories,
      shelves,
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    try {
      const book = await Book.findOrFail(params.id)
      const payload = await request.validateUsing(updateBookValidator)

      book.merge(payload)
      await book.save()

      session.flash('notification', {
        type: 'success',
        message: 'Buku berhasil diperbarui!',
      })
      return response.redirect().toRoute('books.index')
    } catch (error) {
      if (error.messages) {
        session.flash('errors', error.messages)
        session.flash('old', request.all())
      }
      return response.redirect().back()
    }
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const book = await Book.findOrFail(params.id)
      await book.delete()

      session.flash('notification', {
        type: 'success',
        message: 'Buku berhasil dihapus!',
      })
      return response.redirect().toRoute('books.index')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: 'Gagal menghapus buku!',
      })
      return response.redirect().back()
    }
  }
}
