import express from 'express'
const router = express.Router()
import { auth } from '../middleware/auth.js'

import {
  getAll,
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/comment.js'

router.get('/:id', getAll)

router.post('/:id', auth, createComment)
router.delete('/:id', auth, deleteComment)
router.put('/:id', auth, updateComment)

export default router
