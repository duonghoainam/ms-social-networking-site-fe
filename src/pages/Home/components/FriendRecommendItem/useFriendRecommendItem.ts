import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FollowParams } from '../../../../api/user/type/follow.params';
import userAPI from '../../../../api/user/UserApi';
import { FollowingAction } from '../../../../constants/enums/following-action.enum';

export const useFriendRecommendItem = (): any => {
  // const [isShowRecommend, setIsShowRecommend] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = async (targetId: string): Promise<void> => {
    if (isFollow) {
      // const action = unFollow(id);
      // dispatch(action);

      setIsFollow(false);
    } else {
      const params: FollowParams = {
        userId: currentUser.id,
        targetId,
        actionType: FollowingAction.FOLLOW
      };
      await userAPI.handleFollow(params);
      setIsFollow(true);
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
