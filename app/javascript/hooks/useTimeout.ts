import { useRef } from 'react';
import useMountUnmount from './useMountUnmount';

/**
 * 延时执行
 * @param handler 执行函数
 * @param ms 延时毫秒
 */
export default (handler: () => void, ms: number) => {
  const refTimeout = useRef<NodeJS.Timeout>();

  useMountUnmount({
    mount: () => {
      refTimeout.current = setTimeout(() => handler(), ms);
    },
    unmount: () => {
      if (refTimeout.current) clearTimeout(refTimeout.current);
    },
  });
};
