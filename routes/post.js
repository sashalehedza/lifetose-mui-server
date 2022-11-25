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
  updatePostReview,
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

router.post('/:id/reviews/create', auth, createPostReview)
router.post('/:id/reviews/delete/:reviewId', auth, deletePostReview)
router.post('/:id/reviews/update/:reviewId', auth, updatePostReview)

export default router
