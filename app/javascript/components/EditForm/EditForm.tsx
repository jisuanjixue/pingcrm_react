import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Card, Divider, Form, message, Space } from 'antd';
import React from 'react';
import { useSafeState } from 'ahooks';
import { useMountUnmount } from '../../hooks';
import { delay } from '../../utils/asyncUtils';
import type { IEditFormProps } from './interface';
import type { Store } from 'antd/lib/form/interface';
import './index.css';

export default <TDetailView extends Store, TSaveView = TDetailView>({
  encType,
  children,
  footerProps,
  footer = true,
  footerExtra,
  refForm,
  ...props
}: IEditFormProps<TDetailView, TSaveView>) => {
  const form = Form.useForm<TSaveView>()[0];
  const [detail, setDetail] = useSafeState<TDetailView>();
  const [loadingDetail, setLoadingDetail] = useSafeState<boolean>();
  const [loadingSubmit, setLoadingSubmit] = useSafeState<boolean>();

  const onSubmit = async () => {
    setLoadingSubmit(true);
    let values: TSaveView;
    try {
      values = await form.validateFields();
    } catch (e) {
      setLoadingSubmit(false);
      message.error('表单校验失败，请检查');
      return;
    }
    await props.onSubmit?.(values);
    await delay(500);

    setLoadingSubmit(false);
  };

  const initDetail = async () => {
    setLoadingDetail(true);
    await delay(500);
    setDetail(await props.initDetail?.());
    setLoadingDetail(false);
  };

  useMountUnmount({
    mount: () => {
      // eslint-disable-next-line no-param-reassign
      if (refForm) refForm.current = form;
      initDetail();
    },
    unmount: () => {
      // eslint-disable-next-line no-param-reassign
      if (refForm) refForm.current = undefined;
    },
  });

  return (
    <Card loading={loadingDetail} size="small" bordered={false}>
      <Form
        {...props}
        layout="horizontal"
        {...{ form, initialValues: detail, encType }}
        className="form-container"
      >
        {children}
      </Form>
      {footer && typeof footer === 'object' && footer}
      {footer && typeof footer === 'boolean' && (
        <FooterToolbar>
          <Space>
            {footerExtra}
            <Button onClick={props.onCancel} loading={loadingSubmit}>
              {footerProps?.cancelProps?.text || '取消'}
            </Button>
            <Divider type="vertical" />
            <Button onClick={() => form.resetFields()} loading={loadingSubmit}>
              {footerProps?.resetProps?.text || '重置'}
            </Button>
            <Button type="primary" onClick={onSubmit} loading={loadingSubmit}>
              {footerProps?.submitProps?.text || '提交'}
            </Button>
          </Space>
        </FooterToolbar>
      )}
    </Card>
  );
};
