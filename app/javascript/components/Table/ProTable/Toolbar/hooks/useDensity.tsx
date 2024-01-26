import { ColumnHeightOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';
import { useSafeState } from 'ahooks';
import type { IDensityProps, TDensity } from '../interface';

export default ({ defaultSize }: IDensityProps): TDensity => {
  const [size, setSize] = useSafeState<SizeType>(defaultSize || 'middle');

  const Density = (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      arrow
      overlay={
        <Menu
          selectable
          selectedKeys={[size as string]}
          style={{ minWidth: 100 }}
          onClick={({ key }) => setSize(key as SizeType)}
        >
          {([
            { size: 'large', title: '默认' },
            { size: 'middle', title: '中等' },
            { size: 'small', title: '紧凑' },
          ] as { size: SizeType; title: string }[]).map((item) => (
            <Menu.Item key={item.size}>{item.title}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <Tooltip overlay="密度">
        <Button icon={<ColumnHeightOutlined />} style={{ border: 'none' }} />
      </Tooltip>
    </Dropdown>
  );
  return { size, Density };
};
