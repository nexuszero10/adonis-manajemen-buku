import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import Loan from '#models/loan'
import Book from '#models/book'

export default class LoansController {
  async index({ auth, request, view }: HttpContext) {
    const search = request.input('search', '').trim()

    const loansQuery = Loan.query()
      .where('user_id', auth.user!.id)
      .preload('book')
      .orderBy('loan_date', 'desc')

    if (search !== '') {
      loansQuery.whereHas('book', (query) => {
        query.whereILike('title', `%${search}%`)
      })
    }

    const loans = await loansQuery

    return view.render('loans/index', { loans, search })
  }

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

    const loanDateStr = request.input('loan_date')
    const returnDateStr = request.input('return_date')

    if (!loanDateStr || !returnDateStr) {
      session.flash('errors', {
        loan_date: 'Tanggal pinjam wajib diisi',
        return_date: 'Tanggal kembali wajib diisi',
      })
      session.flash('old', request.all())
      return response.redirect().back()
    }

    const loanDate = DateTime.fromISO(loanDateStr)
    const returnDate = DateTime.fromISO(returnDateStr)

    if (returnDate.diff(loanDate, 'days').days < 7) {
      session.flash('errors', {
        return_date: 'Jarak waktu minimal 7 hari dari tanggal pinjam',
      })
      session.flash('old', request.all())
      return response.redirect().back()
    }

    const memberId = auth.user!.id
    const bookId = book.id

    // Cek pinjaman pertama dalam 30 hari terakhir
    const firstLoan = await Loan.query()
      .where('user_id', memberId)
      .where('book_id', bookId)
      .orderBy('loan_date', 'asc')
      .first()

    if (firstLoan) {
      const periodeStart = firstLoan.loanDate
      const periodeEnd = periodeStart.plus({ days: 30 })

      // Apakah loanDate saat ini masih dalam rentang 30 hari dari pinjaman pertama?
      if (loanDate >= periodeStart && loanDate <= periodeEnd) {
        const loanCountResult = await Loan.query()
          .where('user_id', memberId)
          .where('book_id', bookId)
          .whereBetween('loan_date', [
            periodeStart.toISODate() as string,
            periodeEnd.toISODate() as string,
          ])
          .count('* as total')

        const loanCount = loanCountResult[0].$extras.total

        if (loanCount >= 3) {
          session.flash('errors', {
            general:
              'Anda sudah meminjam buku ini maksimal 3 kali dalam periode 30 hari dari pinjaman pertama.',
          })
          session.flash('old', request.all())
          return response.redirect().back()
        }
      }
    }

    await Loan.create({
      userId: memberId,
      bookId: bookId,
      loanDate,
      returnDate,
    })

    session.flash('notification', {
      type: 'success',
      message: 'Buku berhasil dipinjam!',
    })

    return response.redirect().toRoute('loans.index')
  }

  async edit({ params, view, auth }: HttpContext) {
    const loan = await Loan.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .preload('book')
      .firstOrFail()

    const books = await Book.all()

    return view.render('loans/edit', {
      loan,
      books,
      minDate: DateTime.local().toISODate(),
      minReturnDate: DateTime.local().plus({ days: 7 }).toISODate(),
    })
  }

  async update({ params, request, auth, response, session }: HttpContext) {
    const loan = await Loan.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    const bookId = request.input('book_id')
    const loanDateStr = request.input('loan_date')
    const returnDateStr = request.input('return_date')

    if (!bookId || !loanDateStr || !returnDateStr) {
      session.flash('errors', {
        book_id: 'Buku harus dipilih',
        loan_date: 'Tanggal pinjam wajib diisi',
        return_date: 'Tanggal kembali wajib diisi',
      })
      session.flash('old', request.all())
      return response.redirect().back()
    }

    const loanDate = DateTime.fromISO(loanDateStr)
    const returnDate = DateTime.fromISO(returnDateStr)

    if (returnDate.diff(loanDate, 'days').days < 7) {
      session.flash('errors', {
        return_date: 'Jarak waktu minimal 7 hari dari tanggal pinjam',
      })
      session.flash('old', request.all())
      return response.redirect().back()
    }

    loan.bookId = bookId
    loan.loanDate = loanDate
    loan.returnDate = returnDate

    await loan.save()

    session.flash('notification', {
      type: 'success',
      message: 'Data peminjaman berhasil diperbarui!',
    })

    return response.redirect().toRoute('loans.index')
  }
}
