import { useEffect, useRef } from 'react';
const useCloseOutSide = (handler: any): any => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event: any): void => {
      // if (!(Boolean(domNode.current?.contains(event.target)))) {
      //   handler();
      // }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

export default useCloseOutSide;
