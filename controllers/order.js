import asyncHandler from 'express-async-handler'
import OrderModal from '../models/order.js'
import mongoose from 'mongoose'

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

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModal.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModal.find({ user: req.userId })
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const orderPaid = async (req, res) => {
  const { id } = req.params
  try {
    const order = await OrderModal.findById(id)
    let { isPaid } = order

    const updatedOrder = {
      isPaid: !isPaid,
      _id: id,
    }

    await OrderModal.findByIdAndUpdate(id, updatedOrder, { new: true })
    res.json(updatedOrder)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const orderDelivered = async (req, res) => {
  const { id } = req.params
  try {
    const order = await OrderModal.findById(id)
    let { isDelivered } = order

    const updatedOrder = {
      isDelivered: !isDelivered,
      _id: id,
    }

    await OrderModal.findByIdAndUpdate(id, updatedOrder, { new: true })
    res.json(updatedOrder)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
