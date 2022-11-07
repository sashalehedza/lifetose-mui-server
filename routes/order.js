import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import { createOrder, getOrders, getAllOrders } from '../controllers/order.js'

router.post('/create', auth, createOrder)
router.get('/', auth, admin, getAllOrders)
router.get('/userOrders', auth, getOrders)

export default router
