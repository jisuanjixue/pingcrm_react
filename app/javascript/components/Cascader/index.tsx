import { ReloadOutlined } from '@ant-design/icons';
import type { CascaderProps } from 'antd';
import { Button, Cascader, Empty, Input } from 'antd';
import type { DefaultOptionType } from 'antd/lib/cascader';
import type { MutableRefObject } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSafeState } from 'ahooks';
import { hasKey } from '../../utils/objectUtils';
import useMountUnmount from '../../hooks/useMountUnmount';

type TOptionType = DefaultOptionType;
interface IOptionItemFlattened extends TOptionType {
  parent?: IOptionItemFlattened;
}

type TValueType = string;

export interface ICascaderAction {
  refresh?: () => void;
}
export interface ICascaderProps
  extends Omit<CascaderProps<TOptionType>, 'options' | 'value' | 'onChange'> {
  options?: TOptionType[];
  value?: TValueType;
  onChange?: (value: TValueType, selectedOption?: TOptionType) => void;
  request?: () => Promise<TOptionType[] | undefined>;
  refAction?: MutableRefObject<ICascaderAction | undefined>;
}

/**
 * 基于antd基础组件，赋值不再需要完整路径，简化树形赋值
 */
export default ({ options: propsOptions, request: propsRequest, ...props }: ICascaderProps) => {
  const [loading, setLoading] = useSafeState<boolean>();
  const [options, setOptions] = useSafeState<TOptionType[]>();

  const [value, setValue] = useSafeState<TValueType>();

  const [, setForceRender] = useSafeState<number>();

  const refOptionsFlattened = useRef<IOptionItemFlattened[]>();

  const isControlled = hasKey(props, 'value');

  const getValue = () => (isControlled ? props.value : value);

  const fetchRequest = async () => {
    if (!propsRequest) return;

    setLoading(true);
    try {
      setOptions(await propsRequest?.());
    } catch (e) {
      //
    }
    setLoading(false);
  };

  /**
   * 平铺option树
   * @param opts
   * @param parent
   * @returns
   */
  const flatOptions = useCallback(
    (opts?: TOptionType[], parent?: TOptionType): IOptionItemFlattened[] => {
      const optionsFlattened: IOptionItemFlattened[] = [];
      opts?.forEach((item) => {
        if (item.children?.length) {
          optionsFlattened.push(...flatOptions(item.children, item));
        }
        const itemWithParent: IOptionItemFlattened = item;
        itemWithParent.parent = parent;
        optionsFlattened.push(itemWithParent);
      });
      return optionsFlattened;
    },
    [],
  );

  const getValuesReverse = (val?: TValueType): TValueType[] => {
    const option = refOptionsFlattened.current?.find((item) => item.value === val);
    if (!option) return [];

    let values: TValueType[] = [];

    values.push(option.value as string);
    if (option.parent) values = [...values, ...getValuesReverse(option.parent.value as string)];

    return values;
  };

  const getValues = (val?: TValueType) => {
    const values = getValuesReverse(val).reverse();
    if (!values.length) return undefined;

    return values;
  };

  const onChange = (values: TValueType[], selectedOptions?: TOptionType[]) => {
    const val = values?.[values?.length - 1];
    if (!isControlled) setValue(val);
    props.onChange?.(val, selectedOptions?.[selectedOptions?.length - 1]);
  };

  useEffect(() => {
    setOptions(propsOptions);
  }, [propsOptions]);

  useEffect(() => {
    refOptionsFlattened.current = flatOptions(options);
    setForceRender(new Date().getTime());
  }, [flatOptions, options]);

  useMountUnmount({
    mount: () => {
      fetchRequest();
      // eslint-disable-next-line no-param-reassign
      if (props.refAction) props.refAction.current = { refresh: fetchRequest };
    },
  });

  return (
    <Input.Group compact style={{ display: 'flex' }}>
      <Cascader
        changeOnSelect
        allowClear
        {...{
          expandTrigger: 'hover',
          showSearch: {
            filter: (inputValue, path) =>
              path.some(
                (item) =>
                  (item.label as string).toLowerCase().indexOf(inputValue?.toLowerCase()) > -1,
              ),
          },
          placeholder: '请选择',
          notFoundContent: <Empty />,
          ...props,
          style: { ...props.style, flexDirection: 'column' },
          options,
          value: getValues(getValue()),
          onChange: (items: any[], opts: any[]) => onChange(items, opts),
        }}
      />
      {propsRequest && (
        <Button loading={loading} icon={<ReloadOutlined />} onClick={fetchRequest} />
      )}
    </Input.Group>
  );
};
