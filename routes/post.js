import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import {
  createPost,
  deletePost,
  getRelatedPosts,
  getPost,
  getPosts,
  getPostsBySearch,
  getPostsByTag,
  getPostsByUser,
  likePost,
  updatePost,
} from '../controllers/post.js'

router.get('/search', getPostsBySearch)
router.get('/tag/:tag', getPostsByTag)
router.post('/relatedPosts', getRelatedPosts)
router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', auth, admin, createPost)
router.delete('/:id', auth, admin, deletePost)
router.patch('/:id', auth, admin, updatePost)
router.get('/userPosts/:id', auth, admin, getPostsByUser)
router.patch('/like/:id', auth, likePost)

export default router
