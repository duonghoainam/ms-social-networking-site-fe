export const fakeUser = {
  _id: '637bad328b8c922fa7392ed9',
  name: 'minh1',
  email: 'minh1@gmail.com',
  password: '123456',
  avatar: 'http://res.cloudinary.com/wjbucloud/image/upload/v1669576197/yruazctoj49xlyznj7zv.png',
  gender: 'Nam',
  dateofbirth: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  role: 'Male',
  mobile: 999999,
  address: '',
  followers: ['637bb592cac1d671bfaf02d4'],
  following: ['637bb592cac1d671bfaf02d4'],
  createdAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
};

export const fakePosts = [
  {
    _id: '637baf0d8b8c922fa7392f22',
    content: 'post 1',
    images: ['http://res.cloudinary.com/wjbucloud/image/upload/v1669050115/typ1utvwqpdcipaxb9hf.jpg'],
    likes: [],
    comments: [],
    user: '637bad328b8c922fa7392ed9',
    createdAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  },
  {
    _id: '637c98d2c8d209fdad035658',
    content: 'post 2',
    images: ['http://res.cloudinary.com/wjbucloud/image/upload/v1669050115/typ1utvwqpdcipaxb9hf.jpg'],
    likes: [],
    comments: [],
    user: '637bad328b8c922fa7392ed9',
    createdAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  }
]
