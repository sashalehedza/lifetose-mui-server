import mongoose from 'mongoose'
import CommentModal from '../models/comment.js'

export const getAll = async (req, res) => {
  const { id } = req.params
  const comments = await CommentModal.find({ postId: id })
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
  req.body.postId = id
  let comment = await CommentModal.create(req.body)

  comment = await CommentModal.populate(comment, {
    path: 'commentedBy',
    select: ['name'],
  })
  res.status(201).json(comment)
}

export const deleteComment = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No comment exist with id: ${id}` })
    }

    await CommentModal.findByIdAndRemove(id)
    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong' })
  }
}

export const updateComment = async (req, res) => {
  const comment = await CommentModal.findById(req.params.id)
  if (comment.commentedBy.toString() !== req.userId) {
    return res
      .status(400)
      .json('Comment can only be updated by the user who created it')
  }
  let updatedComment = await CommentModal.findByIdAndUpdate(
    { _id: req.params.id },
    { text: req.body.text },
    { new: true }
  )
  updatedComment = await CommentModal.populate(updatedComment, {
    path: 'commentedBy',
    select: ['name'],
  })
  res.json(updatedComment)
}
