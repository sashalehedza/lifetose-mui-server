import asyncHandler from 'express-async-handler'
import OrderModal from '../models/order.js'
import mongoose from 'mongoose'

export const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingMethod,
    shippingPrice,
    totalPrice,
    subtotalPrice,
  } = req.body

  const newOrder = new OrderModal({
    user: req.userId,
    orderItems: orderItems,
    shippingMethod: shippingMethod,
    shippingPrice: shippingPrice,
    subtotalPrice: subtotalPrice,
    totalPrice: totalPrice,
  })

  newOrder.save()
  res.status(201).json(newOrder)
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
  const order = req.body
  try {
    const updatedOrder = {
      ...order,
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
  const order = req.body
  try {
    const updatedOrder = {
      ...order,

      _id: id,
    }

    await OrderModal.findByIdAndUpdate(id, updatedOrder, { new: true })
    res.json(updatedOrder)
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}
