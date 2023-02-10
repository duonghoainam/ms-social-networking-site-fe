export interface UpdatePostDto {
  postId: string,
  content: string,
  oldMedia: string[],
  newMedia: string[]
}
