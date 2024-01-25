import { Button, Descriptions } from 'antd';
const Index = ({ organization }) => (
  <div style={{ overflow: 'auto' }}>
    <Descriptions title="公司详情">
      <Descriptions.Item label="名称">{organization?.name}</Descriptions.Item>
      <Descriptions.Item label="手机号">{organization?.phone}</Descriptions.Item>
      <Descriptions.Item label="电子邮件">{organization?.email}</Descriptions.Item>
      <Descriptions.Item label="地址">{organization?.address} 条</Descriptions.Item>
      <Descriptions.Item label="国家">{organization?.country}</Descriptions.Item>
      <Descriptions.Item label="地区">{organization?.region}</Descriptions.Item>
      <Descriptions.Item label="城市"> {organization?.city}</Descriptions.Item>
    </Descriptions>
  </div>
);

export default Index;
