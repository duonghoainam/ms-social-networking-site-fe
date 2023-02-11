import { useEffect, useState } from 'react';
import { ApiResponse } from '../../api/api-response.type';
import { FollowParams } from '../../api/user/type/follow.params';
import userAPI from '../../api/user/UserApi';
import { MessageToastType } from '../MessageToast/typings.d';
import { FollowingAction } from '../../constants/enums/following-action.enum';
import { showToastMessage } from '../../utils/toast.util';

export const useAccountItem = (user: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const [isFollow, setIsFollow] = useState(false);

  const checkFollowStatus = async (): Promise<void> => {
    const response = await userAPI.getFollowings(currentUser.id);
    const check = response.data.filter((item: any) => item.id === user.id).length > 0;
    setIsFollow(check);
  }
  useEffect(() => {
    void checkFollowStatus();
  })

  const handleFollow = async (): Promise<void> => {
    try {
      const type: FollowingAction = isFollow ? FollowingAction.UNFOLLOW : FollowingAction.FOLLOW;
      const params: FollowParams = {
        userId: currentUser.id,
        targetId: user.id,
        actionType: type
      };
      const result: ApiResponse = await userAPI.handleFollow(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
        setIsFollow(!isFollow);
      } else {
        showToastMessage(result.message, MessageToastType.ERROR);
      }
    } catch (error) {
      showToastMessage('Đã có lỗi xảy ra', MessageToastType.ERROR);
    }
  };
  return {
    handleFollow,
    isFollow
  }
};
