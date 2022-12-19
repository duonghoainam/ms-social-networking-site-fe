import { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { CreateCommentDto } from '../../../../api/post/type/create-comment.dto';
import { useAppDispatch } from '../../../../app/store';
import { addNewComment } from '../../state/homeActions';

export const useAddComment = ({ postId, postUserId }: any): any => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
  const dispatch = useAppDispatch()
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setInputValue((value: string) => value + emojiData.emoji);
  };

  const deleteReply = (): void => {
  };

  const handleKeyDown = async (event: any): Promise<void> => {
    if (event.keyCode === 13) {
      await submitComment();
    }
  };

  const submitComment = async (): Promise<void> => {
    if (inputValue === '' || inputValue === undefined) {
      alert('content is require')
      return;
    }
    const params: CreateCommentDto = {
      postId,
      payload: {
        userId: currentUser.id,
        content: inputValue,
        postUserId
      }
    };
    const actionAddNewComment = addNewComment(params)
    await dispatch(actionAddNewComment).unwrap();
    // reset state of add-comment
    setInputValue('');
    setShowEmoji(false);
    // Thông báo có comment mới cho chủ post
  }

  return {
    submitComment,
    showEmoji,
    setShowEmoji,
    inputValue,
    setInputValue,
    handleEmojiClick,
    handleKeyDown,
    deleteReply
  };
};
