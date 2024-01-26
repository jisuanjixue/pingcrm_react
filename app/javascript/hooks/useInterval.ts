import { useRef } from 'react';
import useMountUnmount from './useMountUnmount';

/**
 * 间隔执行
 * @param handler 执行函数
 * @param ms 间隔毫秒
 */
export default (handler: () => void, ms = 2000) => {
  const refInterval = useRef<NodeJS.Timeout>();

  useMountUnmount({
    mount: () => {
      refInterval.current = setInterval(() => handler(), ms);
    },
    unmount: () => {
      if (refInterval.current) clearInterval(refInterval.current);
    },
  });
};
