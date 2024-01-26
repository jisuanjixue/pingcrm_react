import type {
  TBaseView,
  IProTableProps,
  IProColumnType,
  IProColumnGroupType,
  TProColumnsType,
  ISorterResult,
  TProTableAction,
} from './interface';
import type { ColumnType } from 'antd/es/table/interface';
import type { FixedType } from 'rc-table/lib/interface';
import { useCallback, useEffect, useMemo } from 'react';
import { Card, Table } from 'antd';
import { genColumnsFromProps, isGroupColumn, fixedColumn } from './utils';
import useToolbar from './Toolbar';
import { useCreation } from 'ahooks';

/**
 * 高级表格，对Table扩展了一些东西，也是QueryTable和CRUDTable的基础表格
 */
const ProTable = <TListView extends TBaseView>({
  title,
  columns: propsColumns,
  actionColumn: propsActionColumn,
  toolbarProps,
  sorterResult,
  refAction: propsRefAction,
  ...props
}: IProTableProps<TListView>) => {
  const columns = genColumnsFromProps<TListView>(propsColumns);

  const { size, columnConfigs, Toolbar } = useToolbar({
    ...toolbarProps,
    loading: props.loading,
    defaultSize: props.size,
    columns,
  });

  const hiddenColumnKeys = useMemo(
    () => columnConfigs.filter((cfg) => cfg.hide).map((cfg) => cfg.key),
    [columnConfigs],
  );

  const getColumnKeysByFixed = useCallback(
    (fixed: FixedType = false) =>
      columnConfigs.filter((cfg) => cfg.fixed === fixed && !!cfg.key).map((cfg) => cfg.key!!),
    [columnConfigs],
  );

  const getColumnsByFixed = (cols: TProColumnsType<TListView>, fixed: FixedType = false) =>
    getColumnKeysByFixed(fixed)
      .map((key) => {
        const col = cols.find((item) => item.key === key);
        if (col) return fixedColumn(col, fixed);
        return undefined;
      })
      .filter((item) => !!item)
      .map((item) => item!!);

  const genColumnsBySorter = (cols?: TProColumnsType<TListView>): TProColumnsType<TListView> => {
    if (!cols?.length) return [];

    return (
      cols
        // 过滤隐藏列
        .filter((c) => !hiddenColumnKeys.some((key) => key === c.key))
        .map((col) => {
          if (isGroupColumn(col)) {
            const colGroup = col as IProColumnGroupType<TListView>;
            colGroup.children = genColumnsBySorter(colGroup.children);
            return colGroup;
          }

          const colNormal = col as IProColumnType<TListView>;
          if (colNormal.sorterProps) {
            let sorter: ISorterResult<TListView> | undefined;
            if (sorterResult instanceof Array)
              sorter = sorterResult?.find((cs) => cs.columnKey === colNormal.key);
            else sorter = sorterResult;

            const { sorterProps } = colNormal;

            const colWithSorter: ColumnType<TListView> = {
              sortOrder: sorter?.order,
              sorter: { multiple: 1 },
              ...(typeof sorterProps === 'object'
                ? {
                  showSorterTooltip: sorterProps.showTooltip,
                  sortDirections: sorterProps.directions,
                }
                : {}),
            };

            return { ...col, ...colWithSorter } as IProColumnType<TListView>;
          }
          return colNormal;
        })
    );
  };

  /**
   * 加工渲染的列
   * @returns
   */
  const getColumns4Render = (): TProColumnsType<TListView> => {
    let columns4Render = columns
      // 过滤用户设置的隐藏列
      .filter((c) => !c.hide)
      // 过滤列设置的隐藏列
      .filter((c) => !hiddenColumnKeys.some((key) => key === c.key));

    columns4Render = genColumnsBySorter(columns4Render);

    let actionColumn: IProColumnType<TListView> | undefined;
    if (propsActionColumn)
      actionColumn = {
        width: 100,
        ...propsActionColumn,
        fixed: 'right',
        render: (_, item, index) => propsActionColumn?.render?.(item, index),
      };

    columns4Render = [
      ...getColumnsByFixed(columns4Render, 'left'),
      ...getColumnsByFixed(columns4Render),
      ...getColumnsByFixed(columns4Render, 'right'),
      ...(actionColumn ? [actionColumn] : []),
    ];

    return columns4Render;
  };

  const action = useCreation<TProTableAction>(() => {
    if (!toolbarProps?.onLoad) return undefined;

    return { reload: toolbarProps.onLoad };
  }, [toolbarProps]);

  useEffect(() => {
    if (!propsRefAction) return;

    if (typeof propsRefAction === 'function') {
      propsRefAction(action);
      return;
    }

    // eslint-disable-next-line no-param-reassign
    propsRefAction.current = action;
  }, [propsRefAction, action]);

  return (
    <Card title={title} extra={Toolbar}>
      <Table<TListView>
        rowKey="id"
        {...props}
        scroll={{ x: '100%', y: '100%', ...props.scroll }}
        size={size}
        columns={getColumns4Render()}
        onChange={(pg, filters, sorter, extra) => {
          props.onChange?.(
            pg,
            filters,
            sorter as ISorterResult<TListView> | ISorterResult<TListView>[],
            extra,
          );
        }}
      />
    </Card>
  );
};
export default ProTable;
