import type { DefaultOptionType } from 'antd/lib/cascader';
import { isNumber } from 'lodash';
import type { ISelectListItem } from '../dataTypes/selectListItem';
import type { ISimpleTreeNode } from '../dataTypes/treeNode';
import { isNullOrEmpty } from './stringUtils';

/**
 * 对象是否包含指定key
 * @param obj
 * @param key
 * @returns
 */
export const hasKey = (obj: any, key: string) => Object.keys(obj).some((k) => k === key);

/**
 * 递归获取任意对象的值
 * @param obj
 * @param key key路径，字符串或数组类型。
 *            字符串类型：key用'.'连接，示例：name1.name2.index.name3
 *            数组类型：支持key和索引，示例：['name1','name2',2,'name3']
 * @returns key对应的值
 */
export const getObjValue = <TRes = any>(
  obj?: any,
  key?: string | (string | number)[],
): TRes | undefined => {
  if (!obj || !key) return undefined;

  const keys: (string | number)[] = [];
  if (key instanceof Array) keys.push(...key);
  else if (typeof key === 'string') keys.push(...key.split('.'));

  const nextObj = obj?.[keys[0]];

  const nextKeys = keys.splice(1);
  // 最后一个key则返回值了
  if (!nextKeys.length) return nextObj;

  return getObjValue(nextObj, nextKeys);
};

/**
 * 任意树形结构转换成CascaderOptionType
 * @param labelField
 * @param valueField
 * @param childrenField
 * @param items
 * @returns
 */
export const convert2CascaderOptions = <T = any>(
  labelField: string,
  valueField: string,
  childrenField: string,
  items: T[] | undefined,
): DefaultOptionType[] => {
  if (!items || !items.length) return [];
  return items.map((item) => {
    const children = getObjValue<T[]>(item, childrenField);
    const obj: DefaultOptionType = {
      value: getObjValue(item, valueField),
      label: getObjValue(item, labelField),
      data: item,
    };

    if (children?.length)
      return {
        ...obj,
        children: convert2CascaderOptions(labelField, valueField, childrenField, children),
      };

    return obj;
  });
};

/**
 * SimpleTreeNodes2CascaderOptions
 * @param nodes
 * @returns
 */
export const convertSimpleTreeNodes2CascaderOptions = (nodes: ISimpleTreeNode[]) =>
  convert2CascaderOptions('text', 'value', 'children', nodes);

/**
 * enum转ISelectListItem
 * @param data
 * @returns
 */
export const enumToListItem = (data: any): ISelectListItem[] =>
  Object.entries(data)
    .filter(([, value]) => isNumber(value))
    .map(([text, value]) => ({ text, value }));

/**
 * 拆分字符串
 * @param value 字符串
 * @param splitter 拆分符
 * @returns
 */
export const splitToArray = (value: string | undefined, splitter: string = ','): string[] => {
  if (isNullOrEmpty(value)) return [];

  return value?.split(splitter) || [];
};

/**
 * 判断一个对象是否是Promise
 * @param obj
 * @returns
 */
export const isPromise = (obj: any | undefined) => {
  return (
    !!obj &&
    ((typeof obj === 'object' && typeof obj.then === 'function') || typeof obj === 'function')
  );
};
