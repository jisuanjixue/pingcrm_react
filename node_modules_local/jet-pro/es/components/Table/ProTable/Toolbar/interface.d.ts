import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { FixedType } from 'rc-table/lib/interface';
import type { ReactNode } from 'react';
import type { IProToolbarProps, TBaseView, TProColumnsType } from '../interface';

export interface IDensityProps {
  defaultSize?: SizeType;
}

export type TDensity = { size: SizeType; Density: ReactNode };

export interface IColumnSettingProps<TListView extends TBaseView> {
  columns: TProColumnsType<TListView>;
}

export interface IToolbarPrivateProps<TListView extends TBaseView>
  extends IDensityProps,
    IColumnSettingProps<TListView>,
    IProToolbarProps {}

export interface IColumnConfig {
  key?: string;
  fixed?: FixedType;
  hide?: boolean;
}

export type TToolbar = {
  size: SizeType;
  columnConfigs: IColumnConfig[];
  Toolbar: ReactNode;
};
