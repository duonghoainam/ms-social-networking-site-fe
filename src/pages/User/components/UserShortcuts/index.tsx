import React from "react";
import { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { useUserShortcuts } from "./useUserShortcuts";


export const UserShortcuts = (): ReactElement => {
  const { handleSendMessage, handleFollow, isFollow } = useUserShortcuts();
  return (
    <>
      <Button
        variant="outline-success"
        onClick={() => handleSendMessage()}
      >
        Nhắn tin
      </Button>
      <Button
        variant="outline-success"
        onClick={() => handleFollow()}
      >
        {(Boolean(isFollow)) ? 'Bỏ theo dõi' : 'Theo dõi'}
      </Button>
    </>
  )
};