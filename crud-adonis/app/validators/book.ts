import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    author: vine.string().trim().minLength(3).maxLength(255),
    publishedYear: vine.number(),
    categoryId: vine.number(),
    shelfId: vine.number(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    author: vine.string().trim().minLength(3).maxLength(255),
    publishedYear: vine.number(),
    categoryId: vine.number(),
    shelfId: vine.number(),
  })
)
