// app/validators/auth.ts
import vine from '@vinejs/vine'

// Login hanya menggunakan NIM
export const loginValidator = vine.compile(
  vine.object({
    nim: vine.string().minLength(8).maxLength(20).trim(),
  })
)

// Register user baru dengan nim, name, dst.
export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(50).trim(),

    nim: vine
      .string()
      .minLength(8)
      .maxLength(20)
      .unique(async (db, value) => {
        const exists = await db.from('users').where('nim', value).first()
        return !exists
      }),

    address: vine.string().maxLength(255).trim().optional(),

    phone: vine
      .string()
      .regex(/^(\+62|08)[0-9]{9,13}$/)
      .trim()
      .optional(),

    role: vine.enum(['staff', 'borrower'] as const).optional(),
  })
)
