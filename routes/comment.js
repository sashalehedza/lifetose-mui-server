import express from 'express'
const router = express.Router()
import { auth } from '../middleware/auth.js'

import {
  getAll,
  createComment,
  updateComment,
  getAllReply,
  reply,
} from '../controllers/comment.js'

router.get('/:id', getAll)

router.post('/:id', auth, createComment)
router.put('/:commentId', auth, updateComment)

router.get('/:commentId/reply', getAllReply)
router.post('/:commentId/reply', auth, reply)

export default router
