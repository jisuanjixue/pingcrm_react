import type { DataIndex, FixedType } from 'rc-table/lib/interface';
import type {
  IProColumnGroupType,
  IProColumnType,
  TBaseView,
  TProColumnsType,
  TProColumnType,
} from './interface';
import { hasKey } from '../../../utils/objectUtils';
import { formatDate, formatDateTime, formatTime } from '../../../utils/dateUtils';

/**
 * 是否是分组列
 * @param col
 * @returns
 */
export const isGroupColumn = <TListView extends TBaseView>(col: TProColumnType<TListView>) =>
  hasKey(col, 'children');

/**
 * 生成字段名
 * @param dataIndex
 * @returns
 */
export const genFieldName = (dataIndex?: DataIndex): string => {
  if (!dataIndex) return '';

  if (dataIndex instanceof Array) return dataIndex.join('.');

  return `${dataIndex}`;
};

// export const genColumnKey = <TListView extends TBaseView>(col: TProColumnType<TListView>) => {
//   const { title, dataIndex } = col;
//   const fieldName = genFieldName(dataIndex);
//   return `${title}_${fieldName}`;
// };

/**
 * 生成带key的Columns
 * @param columns
 * @returns colums
 */
export const genColumnsKeyIfy = <
  TLisView extends TBaseView,
  TColumns extends TProColumnsType<TLisView>,
  IColumn extends IProColumnType<TLisView>,
  IColumnGroup extends IProColumnGroupType<TLisView>,
>(
  columns?: TColumns,
) =>
  columns?.map((col) => {
    const key = col.key || genFieldName(col.dataIndex);
    if (isGroupColumn<TLisView>(col)) {
      const colGroup = col as IColumnGroup;
      colGroup.key = key;
      colGroup.children = genColumnsKeyIfy<TLisView, TColumns, IColumn, IColumnGroup>(
        colGroup.children as TColumns,
      );
      return { ...colGroup };
    }
    return { ...col, key };
  }) || [];

/**
 *
 * @param cols
 * @returns
 */
export const genColumnsFromProps = <TListView extends TBaseView>(
  cols?: TProColumnType<TListView>[],
): TProColumnType<TListView>[] => {
  if (!cols?.length) return [];

  const genColumnByProps = (col: TProColumnType<TListView>): TProColumnType<TListView> => {
    const key = col.key || genFieldName(col.dataIndex);

    if (isGroupColumn(col)) {
      const colGroup = col as IProColumnGroupType<TListView>;
      const children = colGroup.children?.map((c) => ({
        ...genColumnByProps(c),
        fixed: colGroup.fixed,
      }));
      return { ...colGroup, children, key };
    }

    const colNormal = col as IProColumnType<TListView>;

    const newCol = { width: 120, ...colNormal, key };

    if (!newCol.render) {
      const { valueType } = newCol;
      switch (valueType) {
        case 'date':
          newCol.render = (val) => formatDate(val);
          newCol.width = 120;
          break;

        case 'time':
          newCol.render = (val) => formatTime(val);
          newCol.width = 100;
          break;

        case 'dateTime':
          newCol.render = (val) => formatDateTime(val);
          newCol.width = 160;
          break;

        case 'enum':
          if (newCol.enumType) {
            newCol.render = (val) => {
              if (typeof val === 'number') return newCol.enumType[val];

              return val;
            };
          }
          break;
        default:
          break;
      }
    }

    return newCol;
  };
  return cols.map((col) => genColumnByProps(col));
};

/**
 * 设置column的fixed属性，如果带分组的列，需要对其children列都设置fixed属性
 * @param column
 * @param fixedType
 * @returns
 */
export const fixedColumn = <TListView extends TBaseView>(
  column: TProColumnType<TListView>,
  fixedType?: FixedType,
) => {
  if (isGroupColumn(column)) {
    const columnGroup = column as IProColumnGroupType<TListView>;
    columnGroup.fixed = fixedType;
    columnGroup.children = columnGroup?.children?.map((col) => fixedColumn(col, fixedType));
    return columnGroup;
  }

  return { ...column, fixed: fixedType };
};

/**
 * 平铺列，将分组列平铺和普通列同层
 * @param columns 列/分组列
 * @returns
 */
export const flatColumns = <
  TLisView extends TBaseView,
  TColumns extends (IColumn | IColumnGroup)[],
  IColumn extends IProColumnType<TLisView>,
  IColumnGroup extends IProColumnGroupType<TLisView>,
>(
  columns?: TColumns,
): IColumn[] => {
  const columnsFlattened: IColumn[] = [];
  columns?.forEach((col) => {
    if (isGroupColumn(col)) {
      const colGroup = col as IColumnGroup;
      flatColumns<TLisView, TColumns, IColumn, IColumnGroup>(colGroup.children as TColumns).forEach(
        (c) => columnsFlattened.push(c),
      );
      return;
    }

    columnsFlattened.push(col as IColumn);
  });
  return columnsFlattened;
};
