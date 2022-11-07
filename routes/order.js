import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import {
  createOrder,
  getOrders,
  getAllOrders,
  orderPaid,
  orderDelivered,
} from '../controllers/order.js'

router.post('/create', auth, createOrder)

router.get('/', auth, admin, getAllOrders)
router.get('/userOrders', auth, getOrders)

router.patch('/paid/:id', auth, admin, orderPaid)
router.patch('/delivered/:id', auth, admin, orderDelivered)

export default router
