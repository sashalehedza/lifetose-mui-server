import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Text is required'],
    },
    rating: {
      type: Number,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  },
  {
    timestamps: true,
  }
)

const CommentModal = mongoose.model('Comment', commentSchema)

export default CommentModal
