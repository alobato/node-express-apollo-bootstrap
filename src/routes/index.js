import dotenv from 'dotenv'
import express from 'express'
import multer from 'multer'
import logger from '../utils/logger.js'
import models from '../models/index.js'

dotenv.config()

const router = express.Router()

const storage = (fileName) => {
  return multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, process.env.UPLOADS_PATH)
    },
    filename: function (_, __, cb) {
      cb(null, fileName)
    }
  })
}

router.get('/now', async (_, res) => {
  logger.debug('now')
  const count = await models.User.countDocuments({ isDeleted: false })
  // eslint-disable-next-line no-console
  console.log('count', count)
  return res.send({ now: new Date().toISOString() })
})

// curl -X POST -H 'content-type: multipart/form-data' -F 'file=@/Users/user/Desktop/1.png' http://localhost:8000/upload
router.post('/upload', async (req, res, next) => {
  try {
    const dateSuffix = new Date().toISOString().replace(/\.\d{3}Z/, '').replace(/\D/g, '')
    const rand = Math.round(Math.random() * 1e9)
    const fileName = `${dateSuffix}_${rand}`
    const extension = 'png'

    const upload = multer({ storage: storage(`${fileName}.${extension}`) }).single('file')

    upload(req, res, async function (err) {
      if (err) {
        logger.error(err)
        return next(err)
      }
      return res.send({ success: true, fileName: `${fileName}.${extension}` })
    })
  } catch (error) {
    logger.error(error)
    return res.send({ success: false })
  }
})

export default router
