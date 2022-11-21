import CommentModal from '../models/comment.js'
import CommentReplyModal from '../models/commentreply.js'

export const getAll = async (req, res) => {
  const { id } = req.params
  const comments = await CommentModal.find({ isRoot: true, postId: id })
    .populate({
      path: 'commentedBy',
      select: ['name'],
    })
    .sort({ createdAt: -1 })
  res.json(comments)
}

export const createComment = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  req.body.commentedBy = userId
  req.body.isRoot = true
  req.body.postId = id
  let comment = await CommentModal.create(req.body)

  comment = await CommentModal.populate(comment, {
    path: 'commentedBy',
    select: ['name'],
  })
  res.status(201).json(comment)
}

export const updateComment = async (req, res) => {
  const comment = await CommentModal.findById(req.params.commentId)
  if (comment.commentedBy.toString() !== req.userId) {
    return res
      .status(400)
      .json('Comment can only be updated by the user who created it')
  }
  let updatedComment = await CommentModal.findByIdAndUpdate(
    { _id: req.params.commentId },
    { text: req.body.text },
    { new: true }
  )
  updatedComment = await CommentModal.populate(updatedComment, {
    path: 'commentedBy',
    select: ['name'],
  })
  res.json(updatedComment)
}

export const getAllReply = async (req, res) => {
  const commentId = req.params.commentId
  const replies = await CommentReplyModal.find({ comment: commentId }).populate(
    {
      path: 'replyComment',
      populate: {
        path: 'commentedBy',
        select: ['name'],
      },
    }
  )
  res.json(replies)
}

export const reply = async (req, res) => {
  const userId = req.userId
  req.body.commentedBy = userId

  const comment = await CommentModal.create(req.body)
  const commentReplyBody = {
    comment: req.params.commentId,
    replyComment: comment._id,
  }
  let commentReply = await CommentReplyModal.create(commentReplyBody)
  commentReply = await CommentReplyModal.populate(commentReply, {
    path: 'replyComment',
    populate: {
      path: 'commentedBy',
      select: ['name'],
    },
  })
  res.status(201).json(commentReply)
}
