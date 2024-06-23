import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' })

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '2MB', maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new UploadThingError('Unauthorized')
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
  productImageUploader: f({
    image: { maxFileSize: '1MB', maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new UploadThingError('Unauthorized')
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
