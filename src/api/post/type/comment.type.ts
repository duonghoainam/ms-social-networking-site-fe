export interface Comment {
  _id: string;
  content: string;
  tag: any[];
  reply: any[];
  parent: string;
  likes: any[];
  user: string;
  postId: string;
  postUserId: string;
  createAt: Date;
  modifiedAt: Date;
}
