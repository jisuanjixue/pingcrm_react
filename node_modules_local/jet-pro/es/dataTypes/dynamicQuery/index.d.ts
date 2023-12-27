import type { FilterType } from './enums';

export interface IFilter {
  and?: boolean;
  type: FilterType;
}

export interface ISimpleFilter extends IFilter {
  path: string;
  value?: any;
}

export interface ICompositeFilter extends IFilter {
  filters: IFilter[];
}

export interface ISorter {
  path: string;
  ascending: boolean;
}
