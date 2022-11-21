import express from 'express'
const router = express.Router()
import { auth, admin } from '../middleware/auth.js'

import {
  getAllCoupons,
  getCoupon,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from '../controllers/coupon.js'

router.get('/', getAllCoupons)
router.get('/:id', auth, admin, getCoupon)

router.post('/create', auth, admin, createCoupon)
router.delete('/:id', auth, admin, deleteCoupon)
router.patch('/:id', auth, admin, updateCoupon)

export default router
