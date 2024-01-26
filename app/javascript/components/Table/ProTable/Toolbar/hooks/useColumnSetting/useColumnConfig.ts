import type { FixedType } from 'rc-table/lib/interface';
import type { TBaseView, TProColumnsType } from '../../../interface';
import type { IColumnConfig } from '../../interface';
import { useEffect } from 'react';
import { useSafeState } from 'ahooks';

interface IProps<TListView extends TBaseView> {
  columns?: TProColumnsType<TListView>;
}

type TColumnsConfig = IColumnConfig[];

export default <TListView extends TBaseView>({
  columns,
}: IProps<TListView>): {
  configs: TColumnsConfig;
  setColumnConfigs: (cfgs: TColumnsConfig) => void;
  setFixedKey: (key?: string, fixed?: FixedType) => void;
  toggleHideKey: (key?: string) => void;
  batchSetHideKeys: (hide: boolean) => void;
} => {
  const [configs, setConfigs] = useSafeState<TColumnsConfig>([]);

  /**
   * 设置列固定模式
   * @param key column key
   * @param fixed FixedType
   */
  const setFixedKey = (key?: string, fixed?: FixedType) => {
    const cfgItem = configs.find((item) => item.key === key);
    if (!cfgItem) return;

    cfgItem.fixed = fixed;
    setConfigs([...configs]);
  };

  /**
   * 切换列隐藏/取消隐藏
   * @param key
   */
  const toggleHideKey = (key?: string) => {
    const cfgItem = configs.find((item) => item.key === key);
    if (!cfgItem) return;

    cfgItem.hide = !cfgItem.hide;
    setConfigs([...configs]);
  };

  /**
   * 批量设置隐藏/取消隐藏
   * @param hide 是否隐藏
   * @returns
   */
  const batchSetHideKeys = (hide: boolean) => setConfigs(configs.map((cfg) => ({ ...cfg, hide })));

  useEffect(() => {
    if (!columns?.length) return;

    const columnsWithoutConfig = columns.filter((col) => !configs.some((c) => c.key === col.key));
    if (!columnsWithoutConfig.length) return;

    let configable = false;
    columnsWithoutConfig.forEach((col) => {
      if (!configs.some((cfg) => cfg.key === col.key)) {
        configable = true;
        configs.push({ key: col.key, fixed: col.fixed || false });
      }
    });
    if (configable) setConfigs([...configs]);
  }, [columns]);

  return {
    configs,
    setColumnConfigs: setConfigs,
    setFixedKey,
    toggleHideKey,
    batchSetHideKeys,
  };
};
