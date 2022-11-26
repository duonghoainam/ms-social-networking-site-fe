import { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';

export const useAddComment = (submitComment: any): any => {
  // const current = JSON.parse(localStorage.getItem("currentUser"));

  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setInputValue((value: string) => value + emojiData.emoji);
  };

  const deleteReply = (): void => {
    // const action = CancelReplyCmd();
    // dispatch(action);
  };

  const handleKeyDown = async (event: any): Promise<void> => {
    if (event.keyCode === 13) {
      await submitComment();
    }
  };

  return {
    showEmoji,
    setShowEmoji,
    inputValue,
    setInputValue,
    handleEmojiClick,
    handleKeyDown,
    deleteReply
  };
};
