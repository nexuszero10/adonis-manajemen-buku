// app/controllers/auth_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async login({ request, auth, response, session }: HttpContext) {
    try {
      const { nim } = await request.validateUsing(loginValidator)

      const user = await User.findBy('nim', nim)
      if (!user) {
        session.flash('error', 'NIM tidak ditemukan!')
        return response.redirect().back()
      }

      await auth.use('web').login(user)

      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat login!')
      return response.redirect().back()
    }
  }

  async register({ request, auth, response, session }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)

      const existingUser = await User.findBy('nim', data.nim)
      if (existingUser) {
        session.flash('error', 'NIM sudah terdaftar!')
        return response.redirect().back()
      }

      const user = await User.create({
        name: data.name,
        nim: data.nim,
        address: data.address,
        phone: data.phone,
        role: data.role || 'borrower',
      })

      await auth.use('web').login(user)
      session.flash('success', 'Registrasi berhasil!')
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat registrasi!')
      return response.redirect().back()
    }
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Logout berhasil!')
    return response.redirect().toRoute('auth.login')
  }
}
