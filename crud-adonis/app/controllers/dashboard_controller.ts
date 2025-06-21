import type { HttpContext } from '@adonisjs/core/http'
import Loan from '#models/loan'

export default class DashboardController {
  async index({ auth, view }: HttpContext) {
    const result = await Loan.query().where('user_id', auth.user!.id).count('* as total')
    const loanCount = Number(result[0].$extras.total)

    return view.render('dashboard', { loanCount })
  }

  async edit({ auth, view }: HttpContext) {
    return view.render('users/edit', { user: auth.user })
  }

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.user!
    const name = request.input('name')
    const address = request.input('address')
    const phone = request.input('phone')

    const errors: Record<string, string> = {}

    if (!name) errors.name = 'Nama wajib diisi'
    if (!phone) errors.phone = 'Nomor HP wajib diisi'

    if (Object.keys(errors).length > 0) {
      session.flash('errors', errors)
      session.flash('old', request.all())
      return response.redirect().back()
    }

    user.name = name
    user.address = address
    user.phone = phone
    await user.save()

    session.flash('notification', {
      type: 'success',
      message: 'Profil berhasil diperbarui!',
    })

    return response.redirect().toRoute('users.edit')
  }
}
