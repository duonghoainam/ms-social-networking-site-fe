import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../../../api/api-response.type";
import { FollowParams } from "../../../../api/user/type/follow.params";
import userAPI from "../../../../api/user/UserApi";
import { AppState } from "../../../../app/state.type";
import { useAppDispatch } from "../../../../app/store";
import { MessageToastType } from "../../../../components/MessageToast/typings.d";
import { FollowingAction } from "../../../../constants/enums/following-action.enum";
import { showToastMessage } from "../../../../utils/toast.util";
import { createConversation } from "../../../Chat/state/chatAction";

export const useUserShortcuts = (): any => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const conversations = useSelector((state: any) => state.chat.conversations);

  const { userInfo } = useSelector((state: AppState) => state.user);

  let [isFollow, setIsFollow] = useState(false);

  // check current user relationship with page's user
  if (currentUser.id !== userInfo.id) {
    const getCurrentUserFollowings = async () => {
      const result = await userAPI.getFollowings(currentUser.id);
      return result.data
    }
    const checkFollow = async (): Promise<void> => {
      const currentUserFollowings = await getCurrentUserFollowings()
      currentUserFollowings.forEach((following: any) => {
        if (following.id === userInfo.id) {
          setIsFollow(true)
        }
      });
    };
    // load following list and check follow to determined follow relationship of current page's user
    useEffect(() => {
      void checkFollow();
    })
  }


  const handleSendMessage = (): any => {
    let exist = [];
    if (conversations.length !== 0) {
      exist = conversations.filter((conversation: any) => {
        if (conversation.members.length === 2) {
          const listIds = conversation.members.map((member: any) => {
            return member.id;
          });
          if (listIds.includes(currentUser.id) && listIds.includes(userInfo.id)) {
            return true;
          }
        }
        return false;
      });
    }
    if (exist.length !== 0) {
      navigate(`/messenger/${exist[0]._id}`);
    } else {
      dispatch(createConversation({
        members: [currentUser.id, userInfo.id],
        createdBy: currentUser.id,
      }))
        .unwrap()
        .then((conversation) => {
          navigate(`/messenger/${conversation._id}`);
        })
        .catch((rejectedValue) => console.log(rejectedValue));
    }
  };

  const handleFollow = async (): Promise<void> => {
    try {
      const type: FollowingAction = isFollow ? FollowingAction.UNFOLLOW : FollowingAction.FOLLOW;
      const params: FollowParams = {
        userId: currentUser.id,
        targetId: userInfo.id,
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
    isFollow,
    handleFollow,
    handleSendMessage,
  }
}