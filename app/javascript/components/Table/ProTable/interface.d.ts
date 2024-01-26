import type { TableCurrentDataSource } from 'antd/es/table/interface';
import type { ColumnType, TableProps } from 'antd/lib/table';
import type { SorterResult, SortOrder, TablePaginationConfig } from 'antd/lib/table/interface';
import type React, { MutableRefObject, ReactNode } from 'react';
import type { IBaseEntity } from '../../../dataTypes/baseEntity';

declare const ValueTypesBase: ['string', 'number', 'enum', 'boolean'];
export type ValueTypeBase = typeof ValueTypesBase[number];

declare const ValueTypesDateTime: ['date', 'time', 'dateTime'];
export type ValueTypeDateTime = typeof ValueTypesDateTime[number];

declare const ValueTypesDateTimeRange: ['date_range', 'time_range', 'dateTime_range'];
export declare type ValueTypeDateTimeRange = typeof ValueTypesDateTimeRange[number];

export declare type TBaseView = IBaseEntity | Record<string, any>;

/**
 * 排序列
 */
export interface ISorterResult<TListView extends TBaseView> extends SorterResult<TListView> {
  column?: IProColumnType<TListView>;
}

type excludeColumnProps =
  | 'dataIndex'
  | 'sorter'
  | 'sortOrder'
  | 'sortDirections'
  | 'showSorterTooltip'
  | 'defaultSortOrder';
// | 'filters'
// | 'filtered'
// | 'filteredValue'
// | 'filterMultiple'
// | 'filterDropdown'
// | 'filterDropdownVisible'
// | 'filterIcon'
// | 'defaultFilteredValue'
// | 'onFilter'
// | 'onFilterDropdownVisibleChange'

export interface IColumnSorterProps {
  /**
   * 字段名，默认由column的dataIndex指定
   */
  name?: string;
  /**
   * 默认排序方式
   */
  defaultValue?: SortOrder;
  /**
   * 可选排序方式
   */
  directions?: SortOrder[];
  /**
   * 是否显示tip
   */
  showTooltip?: boolean;
}

// type TProDataIndex= string|number

type TProDataIndex<T> =
  | readonly (keyof T | string | number)
  | readonly (keyof T | string | number)[];
/**
 * 数据类型Column
 */
export interface IProColumnType<TListView extends TBaseView>
  extends Omit<ColumnType<TListView>, excludeColumnProps> {
  dataIndex?: TProDataIndex;
  /**
   * 唯一且固定值(和dataIndex至少指定一个）。
   * 如果没有指定该值且指定了dataIndex，将从dataIndex生成该值。
   */
  key?: string;

  /**
   * 基本值类型，如果为'enum'类型必须指定enumType
   */
  valueType?: ValueTypeBase | ValueTypeDateTime;

  /**
   * 枚举类型定义，valueType为'enum'则需要指定
   */
  enumType?: any;
  /**
   * 是否不在表格中渲染
   */
  hide?: boolean;
  /**
   * 排序设置
   */
  sorterProps?: boolean | IColumnSorterProps;
}

/**
 * 分组类型Column
 */
export interface IProColumnGroupType<TListView extends TBaseView>
  extends IProColumnType<TListView> {
  /**
   * 子Column
   * @see TProColumnType
   */
  children?: TProColumnType<TListView>[];
}

/**
 * 单独的操作列
 */
export interface IProActionColumnType<TListView extends TBaseView>
  extends Omit<IProColumnType<TListView>, 'key' | 'fixed' | 'dataIndex' | 'render'> {
  /**
   * 操作列render
   */
  render?: (item: TListView, index: number) => ReactNode;
}

/**
 * 列（单个）配置类型
 * @see IProColumnType
 * @see IProColumnGroupType
 */
export declare type TProColumnType<TListView extends TBaseView> =
  | IProColumnType<TListView>
  | IProColumnGroupType<TListView>;

/**
 * 列（多个）配置类型
 */
export declare type TProColumnsType<TListView extends TBaseView> = TProColumnType<TListView>[];

export declare type TProToolbarAction = 'reload' | 'density' | 'columnSetting';

/**
 * toolbar配置项
 */
export interface IProToolbarProps {
  hide?: boolean;
  /** 额外的元素 */
  extra?: ReactNode;
  /**
   * 隐藏actions（'reload' | 'density' | 'columnSetting'）
   * @see TProToolbarAction
   */
  hideActions?: TProToolbarAction[];

  /** 默认接收table的loading属性 */
  loading?: boolean;

  /** 加载，   */
  onLoad?: () => void;
}
/**
 * ProTable配置
 */
export interface IProTableProps<TListView extends TBaseView>
  extends Omit<TableProps<TListView>, 'columns' | 'onChange'> {
  /**
   * toolbar配置项
   * @see IProToolbarProps
   */
  toolbarProps?: IProToolbarProps;
  /**
   * 显示/隐藏加载动画
   */
  loading?: boolean;
  /**
   * 列配置
   * @see {TProColumnsType}
   */
  columns?: TProColumnsType<TListView>;

  /**
   * 操作列，不计入columns
   */
  actionColumn?: IProActionColumnType<TListView>;
  /**
   * 排序字段结果
   * @see ISorterResult
   */
  sorterResult?: ISorterResult<TListView> | ISorterResult<TListView>[];
  /**
   * 分页、排序、筛选变化时触发
   */
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, (React.Key | boolean)[] | null>,
    sorter: ISorterResult<TListView> | ISorterResult<TListView>[],
    extra: TableCurrentDataSource<TListView>,
  ) => void;
  /**
   * 可引用的内部函数
   * @see IProTableAction
   */
  refAction?: MutableRefObject<TProTableAction> | ((action: TProTableAction) => void);
}

export interface IProTableAction {
  /**
   * 重新加载
   */
  reload?: () => void;
}

export type TProTableAction = IProTableAction | undefined;
