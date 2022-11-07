import express from 'express'
const router = express.Router()
import { auth } from '../middleware/auth.js'

import {
  getAll,
  createComment,
  updateComment,
  reply,
  getAllReply,
} from '../controllers/comment.js'

router.get('/:id', getAll)
router.post('/:id', auth, createComment)

router.put('/:commentId', auth, updateComment)

router.post('/:commentId/reply', auth, reply)
router.get('/:commentId/reply', getAllReply)

export default router
