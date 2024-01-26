export interface ISelectListItem {
  text: string;
  value: any;
}
export interface IBaseSave {
  name: string;
}
export interface IBaseSaveSuccess {
  success: boolean;
  data: {
    id: string;
  }
}
export interface ISelectListItemWithData<T> extends ISelectListItem {
  data?: T;
}