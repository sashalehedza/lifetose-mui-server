import asyncHandler from 'express-async-handler'
import OrderModal from '../models/order.js'

export const createOrder = async (req, res) => {
  const { orderItems, shippingPrice, totalPrice } = req.body

  const newPost = new OrderModal({
    user: req.userId,
    orderItems: orderItems,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
  })

  newPost.save()
  res.status(201).json(newPost)
}

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModal.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
