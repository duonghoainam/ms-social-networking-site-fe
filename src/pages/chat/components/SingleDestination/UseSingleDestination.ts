import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import { useAppDispatch } from '../../../../app/store';
import { createTag, deleteTag } from '../../state/chatSlice';

interface useSingDestinationRes {
  handleClick: any;
  handleUnselect: any;
  handleSelect: any;
  tags: any[];
}

export const useSingleDestination = (follow: any): useSingDestinationRes => {
  const dispatch = useAppDispatch();
  // const currentUser = useSelector((state: AppState) => state.auth.current);
  const tags = useSelector((state: AppState) => state.chat.tags);

  function handleSelect(e: any): void {
    e.stopPropagation();
    dispatch(createTag(follow));
  }

  function handleUnselect(e: any): void {
    e.stopPropagation();
    dispatch(deleteTag(follow._id));
  }

  function handleClick(e: any): void {
    // if (!forRenderSearch) {
    //   e.stopPropagation();
    //   //   const temp = tags.find((tag) => {
    //   //     return tag._id === follow._id;
    //   //   });
    //   //   if (temp) {
    //   //     handleUnselect(e);
    //   //   } else {
    //   //     handleSelect(e);
    //   //   }
    // }
  }

  return {
    tags,
    handleClick,
    handleUnselect,
    handleSelect
  };
};
