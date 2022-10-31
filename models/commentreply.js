import mongoose from 'mongoose'

const commentReplySchema = mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  replyComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
})

const CommentReplyModal = mongoose.model('CommentReplies', commentReplySchema)

export default CommentReplyModal
