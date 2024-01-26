import { useMount, useUnmount } from 'ahooks';

interface IProps {
  mount?: () => void;
  unmount?: () => void;
}

/**
 * 使用ahooks的useMount/useUnmount
 */
export default ({ mount, unmount }: IProps) => {
  useMount(() => {
    mount?.();
  });

  useUnmount(() => {
    unmount?.();
  });
};
