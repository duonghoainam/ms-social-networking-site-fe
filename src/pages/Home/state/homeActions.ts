import { createAsyncThunk } from '@reduxjs/toolkit';
import postAPI from '../../../api/post/PostApi';
import { CreateCommentDto } from '../../../api/post/type/create-comment.dto';
import { GetHomePostsDto } from '../../../api/post/type/get-home-posts.dto';
import { LikeDto } from '../../../api/post/type/like.dto';
import { FollowParams } from '../../../api/user/type/follow.params';
import userAPI from '../../../api/user/UserApi';
import { MessageToastType } from '../../../components/MessageToast/typings.d';
import { showToastMessage } from '../../../utils/toast.util';

// Post
export const getHomePosts = createAsyncThunk('post/getPosts', async (params: GetHomePostsDto) => {
  try {
    const response = await postAPI.getHomePosts(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR);
  }
});

export const getPostComments = createAsyncThunk('post/getComments', async (postId: any) => {
  try {
    const response = await postAPI.getPostComments(postId);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const handleLike = createAsyncThunk('post/Like', async (params: LikeDto) => {
  try {
    const response = await postAPI.likePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const handleDislike = createAsyncThunk('post/UnLike', async (params: LikeDto) => {
  try {
    const response = await postAPI.dislikePost(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const addNewComment = createAsyncThunk('home/addNewComment', async (params: CreateCommentDto) => {
  try {
    const response = await postAPI.createComment(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});

export const deleteComment = createAsyncThunk('comment/delete',
  async (params: { postId: any, commentId: any }) => {
    try {
      const response = await postAPI.deleteComment(params.postId, params.commentId);
      if (response.code >= 400) {
        showToastMessage(response.message, MessageToastType.ERROR);
      }
      return response;
    } catch (error) {
      showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
    }
  }
);

// follow actions
export const getListRecommendedFollowings = createAsyncThunk('user/getRecommendedFriends',
  async (userId: string) => {
    try {
      const response: any = await userAPI.getListRecommend(userId);
      const items =  await Promise.all(response.data.map(async (item: any)=> {
        const getPostResponse = await postAPI.getUserPosts(item.user.id);
        const getFollowingsResponse = await userAPI.getFollowings(item.user.id);
        const getFollowersResponse = await userAPI.getFollowers(item.user.id);
        item.user.followings = getFollowingsResponse.data.length
        item.user.followers = getFollowersResponse.data.length
        item.posts = getPostResponse.data
        return item;
      }))
      if (response.code >= 400) {
        showToastMessage(response.message, MessageToastType.ERROR);
      }
      return items;
    } catch (error) {
      showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
    }
  }
);

export const handleFollow = createAsyncThunk('home/handleFollow', async (params: FollowParams) => {
  try {
    const response = await userAPI.handleFollow(params);
    if (response.code >= 400) {
      showToastMessage(response.message, MessageToastType.ERROR);
    }
    return response;
  } catch (error) {
    showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR)
  }
});
