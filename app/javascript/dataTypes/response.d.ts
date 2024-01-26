import type { IBaseEntity } from './baseEntity.d';

export interface IResponse {
  success: boolean;
  errorCode?: number;
  errorMessage?: string;
}

type TBase = IBaseEntity | any;

interface IResponseDataBase<T> extends IResponse {
  data?: T;
}

export type IResponseData<T extends TBase> = IResponseDataBase<T>

export type IResponseListData<T extends TBase> = IResponseDataBase<T[]>

export interface IResponseListDataWithTotal<T extends TBase>
  extends IResponseListData<T> {
  total: number;
}
