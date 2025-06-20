/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| Define all HTTP routes for your application.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Controllers (lazy import)
const AuthController = () => import('#controllers/auth_controller')
const BooksController = () => import('#controllers/books_controller')
const LoansController = () => import('#controllers/loans_controller')

// Root: Redirect ke dashboard jika login, jika tidak ke login
router.get('/', async ({ auth, response }) => {
  if (auth.user) {
    return response.redirect().toRoute('dashboard')
  }
  return response.redirect().toRoute('auth.login')
})

// Guest routes (login & register)
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('login')
    router.post('/login', [AuthController, 'login']).as('check')

    router.get('/register', [AuthController, 'showRegister']).as('register')
    router.post('/register', [AuthController, 'register']).as('checkRegister')
  })
  .as('auth')
  .middleware(middleware.guest())

// Authenticated routes
router
  .group(() => {
    router.post('/logout', [AuthController, 'logout']).as('logout')
    router.get('/dashboard', async ({ view }) => view.render('dashboard')).as('dashboard')
  })
  .middleware(middleware.auth())

// CRUD Buku (books)
router
  .group(() => {
    router.get('/', [BooksController, 'index']).as('index')
    router.get('/create', [BooksController, 'create']).as('create')
    router.post('/', [BooksController, 'store']).as('store')
    router.get('/:id', [BooksController, 'show']).as('show')
    router.get('/:id/edit', [BooksController, 'edit']).as('edit')
    router.post('/:id', [BooksController, 'update']).as('update')
    router.post('/:id/delete', [BooksController, 'destroy']).as('destroy')
  })
  .prefix('/books')
  .as('books')
  .middleware(middleware.auth())

// CRUD Peminjaman (loans)
router
  .group(() => {
    router.get('/pinjam/:bookId', [LoansController, 'create']).as('create')
    router.post('/pinjam/:bookId', [LoansController, 'store']).as('store')
  })
  .prefix('/loans')
  .as('loans')
  .middleware(middleware.auth())
