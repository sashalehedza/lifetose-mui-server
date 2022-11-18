import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import { createCoupon, getAllCoupons } from '../controllers/coupon.js'

router.post('/create', auth, admin, createCoupon)

router.get('/', getAllCoupons)

export default router
