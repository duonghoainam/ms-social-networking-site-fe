export interface CreateCommentDto {
  postId: string
  payload: {
    postUserId: string
    userId: string
    content: string
  }
}
