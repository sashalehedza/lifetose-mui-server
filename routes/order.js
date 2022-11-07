import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import { createOrder, getOrders } from '../controllers/order.js'

router.post('/create', auth, createOrder)
router.get('/', auth, admin, getOrders)

export default router
