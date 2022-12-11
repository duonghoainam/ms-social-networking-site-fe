import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
// import { useSelector } from 'react-redux';
// import { AppState } from '../../../../app/state.type';
import './styles.scss';

export const useFollowList = (setShowModal: any): any => {
  const { followerList, followingList } = useSelector((state: AppState) => state.user)
  // const emtySrtingArray: string[] = [];
  // const followersListStore = emtySrtingArray;
  // const followingListStore = emtySrtingArray;

  // // State
  // const [followersList, setFollowersList] = useState(emtySrtingArray);
  // const [followingList, setFollowingList] = useState(emtySrtingArray);

  // useEffect(() => {
  //   setFollowersList(followersListStore);
  //   setFollowingList(followingListStore);
  // }, [followersListStore, followingListStore]);

  // Handle
  const handleCloseDialog = (): any => {
    setShowModal(false);
  };

  return {
    followerList,
    followingList,
    handleCloseDialog
  };
};