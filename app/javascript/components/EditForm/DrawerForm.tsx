import type { IDrawerFormProps } from './interface';
import React, { useRef } from 'react';
import { useSafeState } from 'ahooks';
import type { FormInstance } from 'antd';
import { Button, Divider, Drawer, Space } from 'antd';
import type { Store } from 'antd/lib/form/interface';
import EditForm from './EditForm';

/**
 *  抽屉表单
 * @param param
 * @returns
 */
const DrawerForm = <TDetailView extends Store, TSaveView = TDetailView>({
  drawerProps,
  visible,
  title = '抽屉表单',
  width = 800,
  footerProps,
  footer,
  footerExtra,
  initDetail,
  onClose: handleOnClose,
  onSubmit,
  children,
  ...props
}: IDrawerFormProps<TDetailView, TSaveView>) => {
  //  = props;
  const refForm = useRef<FormInstance<TSaveView>>();
  const getRefForm = () => props.refForm || refForm;

  const [loadingSubmit, setLoadingSubmit] = useSafeState<boolean>();

  const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      const values = await getRefForm().current?.validateFields();
      setLoadingSubmit(true);
      if (await onSubmit?.(values!!)) {
        handleOnClose?.(e);
      }
      setLoadingSubmit(false);
    } catch (err) {
      //
      setLoadingSubmit(false);
    }
  };

  const Footer = (): JSX.Element => {
    if (footer) return <>{footer}</>;

    return (
      <Space>
        <Button loading={loadingSubmit} onClick={handleOnClose} {...footerProps?.cancelProps}>
          {footerProps?.cancelProps?.text || '取消'}
        </Button>
        <Divider type="vertical" />
        <Button
          loading={loadingSubmit}
          onClick={() => getRefForm().current?.resetFields?.()}
          {...footerProps?.resetProps}
        >
          {footerProps?.resetProps?.text || '重置'}
        </Button>
        <Button
          type="primary"
          loading={loadingSubmit}
          onClick={(e) => submit(e)}
          {...footerProps?.submitProps}
        >
          {footerProps?.submitProps?.text || '确定'}
        </Button>
        {footerExtra}
      </Space>
    );
  };

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      {...{ ...drawerProps, visible, title, width, handleOnClose }}
      onClose={(e) => handleOnClose?.(e as React.MouseEvent<HTMLElement, any>)}
      footer={<Footer />}
    >
      {visible && (
        <EditForm {...{ initDetail, footer: <></>, refForm: getRefForm(), ...props }}>
          {children}
        </EditForm>
      )}
    </Drawer>
  );
};
export default DrawerForm;
