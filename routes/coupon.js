import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import {
  createCoupon,
  deleteCoupon,
  updateCoupon,
  getAllCoupons,
  getCoupon,
} from '../controllers/coupon.js'

router.post('/create', auth, admin, createCoupon)

router.delete('/:id', auth, admin, deleteCoupon)

router.patch('/:id', auth, admin, updateCoupon)

router.get('/', getAllCoupons)

router.get('/:id', auth, admin, getCoupon)

export default router
