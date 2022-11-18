import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import userRouter from './routes/user.js'
import postRouter from './routes/post.js'
import commentRouter from './routes/comment.js'
import orderRouter from './routes/order.js'
import couponRouter from './routes/coupon.js'

import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/post', postRouter)
app.use('/comments', commentRouter)
app.use('/orders', orderRouter)
app.use('/coupons', couponRouter)

app.get('/', (req, res) => {
  res.send('Welcome to post API')
})

const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch((error) => console.log(`${error} did not connect`))
