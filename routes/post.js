import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getPostsByUser,
  getPostsBySearch,
  getPostsByTag,
  getRelatedPosts,
  likePost,
  createPostReview,
  deletePostReview,
} from '../controllers/post.js'

router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', auth, admin, createPost)
router.delete('/:id', auth, admin, deletePost)
router.patch('/:id', auth, admin, updatePost)

router.get('/userPosts/:id', auth, admin, getPostsByUser)
router.get('/search', getPostsBySearch)
router.get('/tag/:tag', getPostsByTag)

router.post('/relatedPosts', getRelatedPosts)

router.patch('/like/:id', auth, likePost)

router.post('/:id/reviews', auth, createPostReview)
router.post('/:id/:reviewId/reviews', auth, deletePostReview)

export default router
