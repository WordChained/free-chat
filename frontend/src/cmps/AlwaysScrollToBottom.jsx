import { useEffect, useRef } from 'react';

export const AlwaysScrollToBottom = () => {
  const elBottom = useRef();
  useEffect(() => elBottom.current.scrollIntoView());
  return <div ref={elBottom}></div>;
};
