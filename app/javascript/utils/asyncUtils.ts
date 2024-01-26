/**
 * 延迟执行
 * @param timeout 延时
 * @returns Promise
 */
export const delay = (timeout = 100) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
