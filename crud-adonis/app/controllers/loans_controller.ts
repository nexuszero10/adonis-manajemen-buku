// app/controllers/loans_controller.ts
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import Loan from '#models/loan'
import Book from '#models/book'

export default class LoansController {
  async create({ params, view }: HttpContext) {
    const book = await Book.findOrFail(params.bookId)
    return view.render('loans/create', {
      book,
      minDate: DateTime.local().toISODate(),
      minReturnDate: DateTime.local().plus({ days: 7 }).toISODate(),
      defaultLoanDate: DateTime.local().toISODate(),
      defaultReturnDate: DateTime.local().plus({ days: 7 }).toISODate(),
    })
  }

  async store({ params, request, auth, session, response }: HttpContext) {
    const book = await Book.findOrFail(params.bookId)

    const loanDate = request.input('loan_date')
    const returnDate = request.input('return_date')

    if (!loanDate || !returnDate) {
      session.flash('errors', {
        loan_date: 'Tanggal pinjam wajib diisi',
        return_date: 'Tanggal kembali wajib diisi',
      })
      session.flash('old', request.all())
      return response.redirect().back()
    }

    await Loan.create({
      userId: auth.user!.id,
      bookId: book.id,
      loanDate: DateTime.fromISO(loanDate).toJSDate(),
      returnDate: DateTime.fromISO(returnDate).toJSDate(),
    })

    session.flash('notification', {
      type: 'success',
      message: 'Buku berhasil dipinjam!',
    })
    return response.redirect().toRoute('books.index')
  }
}
