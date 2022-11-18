import CouponModal from '../models/coupon.js'

export const createCoupon = async (req, res) => {
  const { name, percent } = req.body

  const newCoupon = new CouponModal({
    user: req.userId,
    name,
    percent,
  })

  newCoupon.save()
  res.status(201).json(newCoupon)
}

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponModal.find()
    res.status(200).json(coupons)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
