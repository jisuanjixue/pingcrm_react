import { ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import type { TBaseView } from '../interface';
import useColumnSetting from './hooks/useColumnSetting';
import useDensity from './hooks/useDensity';
import type { IToolbarPrivateProps, TToolbar } from './interface';

export default <TListView extends TBaseView>({
  defaultSize,
  hide,
  extra,
  hideActions,
  ...props
}: IToolbarPrivateProps<TListView>): TToolbar => {
  const { size, Density } = useDensity({ defaultSize });
  const { configs: columnConfigs, ColumnSetting } = useColumnSetting({
    columns: props.columns,
  });

  const Toolbar = !hide && (
    <Space>
      {extra}
      {!hideActions?.some((a) => a === 'reload') && (
        <Tooltip overlay="刷新">
          <Button
            loading={props.loading}
            icon={<ReloadOutlined />}
            style={{ border: 'none' }}
            onClick={props.onLoad}
          />
        </Tooltip>
      )}
      {!hideActions?.some((a) => a === 'density') && Density}
      {!hideActions?.some((a) => a === 'columnSetting') && ColumnSetting}
    </Space>
  );

  return { size, columnConfigs, Toolbar };
};
