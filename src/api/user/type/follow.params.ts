import { FollowingAction } from '../../../constants/enums/following-action.enum';

export interface FollowParams {
  userId: string
  targetId: string
  actionType: FollowingAction
}
