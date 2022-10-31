import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  price: Number,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
})

const PostModal = mongoose.model('Post', postSchema)

export default PostModal
