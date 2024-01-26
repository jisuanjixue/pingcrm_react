import type { FixedType } from 'rc-table/lib/interface';
import type { DragSourceMonitor, DropTargetMonitor, XYCoord } from 'react-dnd';
import type { TBaseView, TProColumnType } from '../../../interface';
import React, { useRef } from 'react';
import { Button, Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import {
  MenuOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';

type TDirection = 'up' | 'down' | undefined;

interface IDragItem<TListView extends TBaseView> {
  type: string;
  index: number;
  column: TProColumnType<TListView>;
}

export interface IDndItemProps<TListView extends TBaseView>
  extends IDragItem<TListView> {
  hiddenKeys: string[];
  currentHoverIndex: number | undefined;
  onDrop: (dragIndex: number, hoverIndex: number) => void;
  setCurrentHoverIndex: (index?: number) => void;

  toggleKeyHide: (key?: string) => void;
  onColumnFixed: (key?: string, fixed?: FixedType) => void;
}

export default <TListView extends TBaseView>({
  type,
  hiddenKeys,
  currentHoverIndex,
  index,
  column,
  onDrop,
  setCurrentHoverIndex,
  toggleKeyHide,
  onColumnFixed,
}: IDndItemProps<TListView>) => {
  const ref = useRef<HTMLLIElement>(null);
  const refDirection = useRef<TDirection>();
  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: type,
      collect: monitor => ({ handlerId: monitor.getHandlerId() }),
      hover: (item: IDragItem<TListView>, monitor: DropTargetMonitor) => {
        if (!ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        // if (dragIndex === hoverIndex) return;

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset() as XYCoord;
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          refDirection.current = 'down';
        }

        // Dragging upwards
        else if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          refDirection.current = 'up';
        }

        setCurrentHoverIndex(hoverIndex);

        // Time to actually perform the action
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
      },
      drop: (item: IDragItem<TListView>) => {
        onDrop(item.index, index);
      },
    }),
    [onDrop],
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { type, index, column },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor: DragSourceMonitor) => {
        if (!monitor.didDrop()) setCurrentHoverIndex(undefined);
      },
    }),
    [column.key, index],
  );

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  const Indicator = ({
    direction,
    itemIndex,
  }: {
    direction: TDirection;
    itemIndex: number;
  }) => (
    <div
      className="hover-indicator"
      style={{
        opacity:
          currentHoverIndex === itemIndex && refDirection.current === direction
            ? 1
            : 0,
      }}
    />
  );

  return (
    <li
      key={column.key}
      ref={ref}
      style={{ cursor: 'move', opacity }}
      data-handler-id={handlerId}
    >
      <Indicator {...{ direction: 'up', itemIndex: index }} />
      <div style={{ display: 'flex' }}>
        <div style={{ flexDirection: 'column' }}>
          <MenuOutlined />
        </div>
        <div style={{ flexDirection: 'column', width: '100%' }}>
          <Checkbox
            style={{ width: '100%', marginLeft: 5 }}
            value={column.key}
            checked={!hiddenKeys.some(k => k === column.key)}
            onChange={() => toggleKeyHide(column.key as string)}
          >
            {column.title}
            <span className="col-actions">
              {column.fixed && (
                <Tooltip title="不固定">
                  <Button
                    size="small"
                    type="link"
                    icon={<VerticalAlignMiddleOutlined />}
                    onClick={() => onColumnFixed(column.key, false)}
                  />
                </Tooltip>
              )}
              {(!column.fixed || column.fixed === 'right') && (
                <Tooltip title="固定在左侧">
                  <Button
                    size="small"
                    type="link"
                    icon={<VerticalAlignTopOutlined />}
                    onClick={() => onColumnFixed(column.key, 'left')}
                  />
                </Tooltip>
              )}
              {(!column.fixed || column.fixed === 'left') && (
                <Tooltip title="固定在右侧">
                  <Button
                    size="small"
                    type="link"
                    icon={<VerticalAlignBottomOutlined />}
                    onClick={() => onColumnFixed(column.key, 'right')}
                  />
                </Tooltip>
              )}
            </span>
          </Checkbox>
        </div>
      </div>
      <Indicator {...{ direction: 'down', itemIndex: index }} />
    </li>
  );
};
