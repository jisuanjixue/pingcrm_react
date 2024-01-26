import type { FixedType } from 'rc-table/lib/interface';
import type { TProColumnsType, TBaseView } from '../../../interface';
import type { IColumnConfig } from '../../interface';
import { useCallback, useMemo } from 'react';
import { useSafeState } from 'ahooks';
import update from 'immutability-helper';
import DndItem from './DndItem';

interface IProps<TListView extends TBaseView> {
  fixedType: FixedType;
  columnConfigs: IColumnConfig[];
  columns: TProColumnsType<TListView>;
  onColumnFixed: (key?: string, fixedType?: FixedType) => void;
  onToggleKeyHide: (key?: string) => void;
  onKeysOrder: (fixedType: FixedType, keysOrdered: string[]) => void;
}

export default <TListView extends TBaseView>({
  fixedType,
  columnConfigs,
  columns = [],
  onToggleKeyHide,
  onColumnFixed,
  onKeysOrder,
}: IProps<TListView>) => {
  const [currentHoverIndex, setCurrentHoverIndex] = useSafeState<number>();

  const hiddenKeys = useMemo(
    () => columnConfigs.filter((cfg) => cfg.hide && !!cfg.key).map((cfg) => cfg.key!!),
    [columnConfigs],
  );

  const keysFixed = useMemo(
    () => columnConfigs.filter((cfg) => cfg.fixed === fixedType && cfg.key).map((cfg) => cfg.key!!),

    [columnConfigs, fixedType],
  );

  const columnsFixed = useMemo(
    () =>
      keysFixed
        .map((key) => {
          const column = columns.find((col) => col.key === key);
          if (column) return { ...column, fixed: fixedType };

          return undefined;
        })
        .filter((col) => !!col)
        .map((col) => col!!),
    [keysFixed, columns, fixedType],
  );

  const onDrop = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCurrentHoverIndex(undefined);
      if (dragIndex === hoverIndex) return;

      const dragItem = keysFixed[dragIndex];
      onKeysOrder(
        fixedType,
        update(keysFixed, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        }),
      );
    },
    [columnsFixed],
  );

  return (
    <ul style={{ maxHeight: 200, overflow: 'auto' }}>
      {columnsFixed.map((column, index) => (
        <DndItem
          key={column.key}
          {...{
            type: `dnd_item_${fixedType || 'no'}_fixed`,
            hiddenKeys,
            column,
            index,
            onDrop,
            currentHoverIndex,
            setCurrentHoverIndex,
            toggleKeyHide: onToggleKeyHide,
            onColumnFixed,
          }}
        />
      ))}
    </ul>
  );
};
