import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '../../../../api/api-response.type';
import { FollowParams } from '../../../../api/user/type/follow.params';
import userAPI from '../../../../api/user/UserApi';
import { MessageToastType } from '../../../../components/MessageToast/typings.d';
import { FollowingAction } from '../../../../constants/enums/following-action.enum';
import { showToastMessage } from '../../../../utils/toast.util';

export const useFollowRecommendItem = (): any => {
  // const [isShowRecommend, setIsShowRecommend] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = async (targetId: string): Promise<void> => {
    try {
      const type: FollowingAction = isFollow ? FollowingAction.UNFOLLOW : FollowingAction.FOLLOW;
      const params: FollowParams = {
        userId: currentUser.id,
        targetId,
        actionType: type
      };
      const result: ApiResponse = await userAPI.handleFollow(params);
      if (result.code < 300) {
        showToastMessage(result.message, MessageToastType.SUCCESS);
      } else {
        showToastMessage(result.message, MessageToastType.ERROR);
      }
      setIsFollow(!isFollow);
    } catch (error) {
      showToastMessage('Unknown error', MessageToastType.ERROR);
    }
  };

  const handleShowProfile = (): void => {
    navigate('/account');
  };
  return {
    isFollow,
    setIsFollow,
    handleShowProfile,
    handleFollow
  };
};
