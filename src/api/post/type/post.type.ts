export interface Post {
  _id: string
  content: string
  images: string[]
  likes: any[]
  comments: any[]
  user: any
  createdAt: Date
}
