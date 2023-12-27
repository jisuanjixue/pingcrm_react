export interface ITreeNode<T> {
  item: T;
  children?: ITreeNode<T>[];
}

export interface ISimpleTreeNode {
  value: string;
  text: string;
  parentId?: string;
  children?: ISimpleTreeNode[];
}

export interface ICascaderData {
  value: string;
  label: string;
  disabled?: boolean;
  children?: ICascaderData[];
}
