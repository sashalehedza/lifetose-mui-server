import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Text is required'],
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    isRoot: {
      type: Boolean,
      default: false,
    },
    childrenCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const CommentModal = mongoose.model('Comment', commentSchema)

export default CommentModal
