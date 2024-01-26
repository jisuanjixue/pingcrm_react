import type { IModalFormProps } from './interface';
import React, { useRef } from 'react';
import { Button, Divider, Modal, Space } from 'antd';
import { useSafeState } from 'ahooks';
import type { FormInstance } from 'antd';
import type { Store } from 'antd/lib/form/interface';
import EditForm from './EditForm';

/**
 *  对话框表单
 */
const ModalForm = <TDetailView extends Store, TSaveView = TDetailView>({
  modalProps,
  visible,
  title = '弹窗表单',
  width = 800,
  footerProps,
  footer,
  footerExtra,
  initDetail,
  onClose,
  onSubmit,
  children,
  ...props
}: IModalFormProps<TDetailView, TSaveView>) => {
  const refForm = useRef<FormInstance<TSaveView>>();
  const getRefForm = () => props.refForm || refForm;

  const [loadingSubmit, setLoadingSubmit] = useSafeState<boolean>();

  const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      const values = await getRefForm().current?.validateFields?.();
      setLoadingSubmit(true);
      if (await onSubmit?.(values!!)) {
        onClose?.(e);
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
        <Button loading={loadingSubmit} onClick={onClose} {...footerProps?.cancelProps}>
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
    <Modal
      destroyOnClose
      maskClosable={false}
      {...{ ...modalProps, visible, title, width, onCancel: onClose }}
      footer={<Footer />}
    >
      {visible && (
        <EditForm {...{ initDetail, footer: <></>, refForm: getRefForm(), ...props }}>
          {children}
        </EditForm>
      )}
    </Modal>
  );
};

export default ModalForm;
