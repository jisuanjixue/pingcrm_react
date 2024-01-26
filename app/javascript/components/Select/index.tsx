import type { ISelectListItem, IBaseSave, IBaseSaveSuccess } from '../../dataTypes/selectListItem';
import type { SelectProps, SelectValue } from 'antd/lib/select';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import React, { useRef } from 'react';
import { useDebounceFn, useSafeState } from 'ahooks';
import { Button, Select as ASelect, Spin, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMount } from 'ahooks';
import EditForm from '../EditForm/index';
import { hasKey, isPromise } from '../../utils/objectUtils';
import { delay } from '../../utils/asyncUtils';
export interface ISelectProps<
  TDataItem extends any = ISelectListItem,
  TV extends SelectValue = SelectValue,
  TSaveView extends any = IBaseSave,
> extends Omit<SelectProps<TV>, 'options' | 'filterOption' | 'onSearch' | 'onChange'> {
  onChange?: (value: SelectValue, option: TDataItem | undefined) => void;
  /** 选项列表 */
  options?: TDataItem[];
  /** 本地数据搜索表达式，默认和text做模糊匹配 */
  filterPredicate?: (search: string, data: TDataItem) => boolean;
  /** 异步获取选项列表，可用于远程请求 */
  request?: (search?: string) => Promise<TDataItem[] | undefined>;
  /** 绑定数据字段，如果非ISelectListItem约束类型，需指定对应字段名 */
  fieldNames?: { label: string; value: string };
  /** 自定义渲染Option内容 */
  renderItem?: (data: TDataItem) => ReactNode;
  /** 自定义渲染添加按钮及 form Modal */
  isAdd?: boolean;
  /** 异步获取选项列表，可用于远程请求 */
  requestAdd?: (data?: TSaveView) => Promise<IBaseSaveSuccess | undefined>;
  /** 自定义渲染添加按钮及 form Modal */
  formItems?: () => ReactNode;
}

/**
 * 选择器
 * @param props
 * @returns
 */
const Select = <TDataItem extends any = ISelectListItem, TV extends SelectValue = SelectValue>(
  props: ISelectProps<TDataItem, TV, IBaseSave>,
) => {
  const {
    options: propsOptions,
    loading: propsLoading,
    request,
    fieldNames = { label: 'text', value: 'value' },
    filterPredicate: propsFilterPredicate,
    onChange: propsOnChange,
    renderItem,
    isAdd,
    requestAdd,
    formItems: propsFormItems,
    ...resetProps
  } = props;

  const requestAble = isPromise(request);

  const refFetchId = useRef<number>(0);

  const genFetchId = () => {
    const id = refFetchId.current + 1;
    if (id > 100) return 0;

    return id;
  };

  const [options, setOptions] = useSafeState<TDataItem[] | undefined>(propsOptions);
  const [showAdd, setShowAdd] = useSafeState<boolean>();
  const [optionItem, setOptionItem] = useSafeState<string>();
  let [loading, setLoading] = useSafeState<boolean>();
  if (hasKey(props, 'loading')) {
    loading = propsLoading;
    setLoading = () => { };
  }

  const filterPredicate = (search: string | undefined, value: string) => {
    if (requestAble) return true;

    if (!search) return true;

    const item = options?.find((opt) => opt[fieldNames.value] === value);

    if (!item) return false;

    if (propsFilterPredicate) return propsFilterPredicate(search, item);

    const label = item[fieldNames.label] as string | undefined;
    return (label || '').indexOf(search) > -1;
  };

  const { run: debounceFetch } = useDebounceFn(
    async (search?: string) => {
      if (!requestAble) return;

      const fetchId = genFetchId();
      refFetchId.current = fetchId;

      setLoading(true);
      await delay(100);
      try {
        const data = await request?.(search);
        if (fetchId !== refFetchId.current) return;

        setOptions(data);
      } catch (e) {
        //
      }
      setLoading(false);
    },
    { wait: 500 },
  );

  const onChangeOptions = (value: SelectValue) => {
    setOptionItem(value as string);
    propsOnChange?.(
      value,
      options?.find((item) => item[fieldNames.value] === value),
    );
  };

  const onRenderAdd = () => (
    <Button type="primary" icon={<PlusOutlined onClick={() => setShowAdd(true)} />} />
  );

  useMount(() => {
    debounceFetch();
  });

  useEffect(() => {
    setOptions(propsOptions);
  }, [propsOptions]);

  const renderFormItems = (): ReactNode => propsFormItems?.();

  return (
    <>
      <Input.Group compact style={{ display: 'flex' }}>
        <ASelect<TV>
          allowClear
          loading={loading}
          onSearch={
            requestAble
              ? (search) => {
                setOptions([]);
                debounceFetch(search);
              }
              : undefined
          }
          filterOption={(search, option) => filterPredicate(search, option?.value as string)}
          placeholder="请选择"
          notFoundContent={loading ? <Spin size="small" /> : '未找到记录'}
          style={{ minWidth: 150 }}
          value={options?.find((item) => item[fieldNames.value] === optionItem) as TV}
          {...resetProps}
          onChange={(value) => onChangeOptions(value)}
        >
          {options?.map((item) => {
            const value = (item as any)[fieldNames.value];
            const label = (item as any)[fieldNames.label];
            return (
              <ASelect.Option key={value} {...{ value }}>
                {renderItem ? renderItem(item) : label}
              </ASelect.Option>
            );
          })}
        </ASelect>
        {isAdd ? onRenderAdd() : undefined}
      </Input.Group>
      {showAdd && (
        <EditForm.Modal
          {...{
            visible: showAdd,
            title: '添加',
            onClose: () => setShowAdd(false),
            initDetail: async () => ({ name: '' }),
            onSubmit: async (data: IBaseSave) => {
              await delay(1000);
              const res = await requestAdd?.(data);
              if (res?.success) {
                debounceFetch(data.name);
                onChangeOptions(res?.data?.id);
                setOptionItem(res?.data?.id);
                return true;
              }
              return false;
            },
          }}
        >
          {renderFormItems()}
        </EditForm.Modal>
      )}
    </>
  );
};

export default Select;
