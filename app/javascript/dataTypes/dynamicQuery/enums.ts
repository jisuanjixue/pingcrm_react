export enum FilterType {
  Equal,
  Contains,
  StartsWith,
  EndsWith,
  Composite,
  NotEqual,
  GreaterThan,
  LessThanOrEqual,
  GreaterThanOrEqual,
  LessThan,
  In,
  NotIn,
}

export const FilterTypeTip = {
  Equal: '等于',
  Contains: '包含',
  StartsWith: '开始于',
  EndsWith: '结束于',
  Composite: '',
  NotEqual: '不等于',
  GreaterThan: '大于',
  LessThanOrEqual: '小于等于',
  GreaterThanOrEqual: '大于等于',
  LessThan: '小于',
  In: '在集合',
  NotIn: '不在集合',
};
