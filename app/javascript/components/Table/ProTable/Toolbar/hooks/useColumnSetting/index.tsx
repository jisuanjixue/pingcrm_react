import { SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Popover, Tooltip } from 'antd';
import type { FixedType } from 'rc-table/lib/interface';
import React, { useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { TBaseView, TProColumnsType } from '../../../interface';
import type { IColumnConfig, IColumnSettingProps } from '../../interface';
import DndList from './DndList';
import useColumnConfig from './useColumnConfig';
import './index.css';

interface IColumnListProps<TListView extends TBaseView> {
  fixedType: FixedType;
  title: string;
  showTitle?: boolean;
  columnConfigs: IColumnConfig[];
  columns: TProColumnsType<TListView>;
  onToggleKeyHide: (key?: string) => void;
  setFixedKey: (key?: string, fixed?: FixedType) => void;
  onKeysOrder: (fixed: FixedType, keysOrdered: string[]) => void;
}

const ColumnList = <TListView extends TBaseView>({
  fixedType,
  title,
  showTitle = true,
  columnConfigs = [],
  columns = [],
  onToggleKeyHide,
  setFixedKey,
  onKeysOrder,
}: IColumnListProps<TListView>) => {
  const fixedKeys = useMemo(
    () =>
      columnConfigs
        .filter(cfg => cfg.fixed === fixedType && !!cfg.key)
        .map(cfg => cfg.key!!),
    [columnConfigs, fixedType],
  );

  if (!fixedKeys.length) return <></>;

  return (
    <>
      {showTitle && <span className="fixed-title">{title}</span>}
      <DndProvider backend={HTML5Backend}>
        <DndList
          {...{
            fixedType,
            columnConfigs,
            columns,
            onToggleKeyHide,
            onColumnFixed: setFixedKey,
            onKeysOrder,
          }}
        />
      </DndProvider>
    </>
  );
};

export default <TListView extends TBaseView>(
  props: IColumnSettingProps<TListView>,
): {
  configs: IColumnConfig[];
  ColumnSetting: JSX.Element;
} => {
  // 处理props的columns
  const propsColumns = props.columns.filter(col => !!col.key);

  const {
    configs: columnConfigs,
    setColumnConfigs,
    setFixedKey,
    toggleHideKey,
    batchSetHideKeys,
  } = useColumnConfig({
    columns: propsColumns,
  });

  const hiddenKeys = useMemo(
    () => columnConfigs.filter(item => item.hide).map(item => item.key!!),
    [columnConfigs],
  );

  const getKeysByFixed = useCallback(
    (fixed: FixedType = false) =>
      columnConfigs
        .filter(item => item.fixed === fixed)
        .map(item => item.key!!),
    [columnConfigs],
  );

  const fixedLeftKeys = useMemo(() => getKeysByFixed('left'), [getKeysByFixed]);

  const fixedRightKeys = useMemo(() => getKeysByFixed('right'), [
    getKeysByFixed,
  ]);

  const onKeysOrder = (fixed: FixedType, keysOrdered: string[]) => {
    const colCfgs = keysOrdered.map(key => {
      const orgCfg = columnConfigs.find(item => item.key === key);
      return { ...orgCfg, fixed };
    });
    setColumnConfigs([
      ...columnConfigs.filter(
        item => !keysOrdered.some(key => key === item.key),
      ),
      ...colCfgs,
    ]);
  };

  const getColumnListProps = (title: string, fixedType: FixedType = false) => ({
    title,
    fixedType,
    columnConfigs,
    columns: propsColumns,
    onToggleKeyHide: toggleHideKey,
    setFixedKey,
    onKeysOrder,
  });

  const ColumnSetting = (
    <Popover
      placement="bottomRight"
      trigger="click"
      overlayClassName="columns-etting-container"
      style={{ padding: 0 }}
      title={
        <div style={{ padding: '5px 0px' }}>
          <Checkbox
            indeterminate={
              hiddenKeys.length > 0 && hiddenKeys.length < propsColumns.length
            }
            checked={hiddenKeys.length === 0}
            onChange={({ target: { checked } }) => batchSetHideKeys(!checked)}
          >
            列设置
          </Checkbox>
        </div>
      }
      content={
        <>
          <ColumnList {...getColumnListProps('固定在左侧', 'left')} />
          <ColumnList
            {...{
              ...getColumnListProps('不固定'),
              showTitle: fixedLeftKeys.length > 0 || fixedRightKeys.length > 0,
            }}
          />
          <ColumnList {...getColumnListProps('固定在右侧', 'right')} />
        </>
      }
    >
      <Tooltip overlay="列设置">
        <Button
          icon={<SettingOutlined color="#666" twoToneColor="#666" />}
          style={{ border: 'none' }}
        />
      </Tooltip>
    </Popover>
  );

  return {
    configs: columnConfigs,
    ColumnSetting,
  };
};
