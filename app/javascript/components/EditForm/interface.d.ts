import type { ButtonProps, DrawerProps, FormProps, ModalProps } from 'antd';
import type { FormInstance } from 'antd';
import type { Store } from 'antd/lib/form/interface';
import type { MutableRefObject, ReactNode } from 'react';

type excludeProps = 'visible' | 'title' | 'width' | 'footer' | 'onClose';

type TModalProps = Omit<DrawerProps, excludeProps>;
type TDrawerProps = Omit<ModalProps, excludeProps>;

type TFooterButtonProps = ButtonProps & { text?: ReactNode };

export interface IFormProps<TDetailView extends Store, TSaveView = TDetailView> extends FormProps {
  /** 表单初始化数据，因为表单只接收一次初始花数据，把数据备注好再返回 */
  initDetail?: () => Promise<TDetailView | undefined>;
  /** form实例，默认使用内置form实例
   * @default undefined
   */
  form?: FormInstance<TSaveView>;

  children?: ReactNode;
}

interface IDrawerOrModalFormProps<TDetailView extends Store, TSaveView = TDetailView>
  extends Omit<IFormProps<TDetailView, TSaveView>, 'form' | 'title'> {
  /** 引用form实例 */
  refForm?: MutableRefObject<FormInstance<TSaveView> | undefined>;
  /** 是否显示 */
  visible?: boolean;
  /** 标题 */
  title?: ReactNode;
  /** 宽度 */
  width?: string | number;

  /** footer配置 */
  footerProps?: {
    /** 取消按钮 */
    cancelProps?: TFooterButtonProps;
    /** 重置按钮 */
    resetProps?: TFooterButtonProps;
    /** 提交按钮 */
    submitProps?: TFooterButtonProps;
  };
  /** 重绘footer */
  footer?: ReactNode;
  /** footer额外元素 */
  footerExtra?: ReactNode;
  /** 返回Promise<boolean>，true则收起抽屉/关闭对话框 */
  onSubmit?: (data: TSaveView) => Promise<boolean>;

  /** 关闭 */
  onClose?: (e: React.MouseEvent<HTMLElement, any>) => void;
}
export interface IDrawerFormProps<TDetailView, TSaveView = TDetailView>
  extends IDrawerOrModalFormProps<TDetailView, TSaveView> {
  /** drawer配置 */
  drawerProps?: Omit<DrawerProps, excludeProps>;
}

export interface IModalFormProps<TDetailView, TSaveView = TDetailView>
  extends IDrawerOrModalFormProps<TDetailView, TSaveView> {
  /** modal配置 */
  modalProps?: Omit<ModalProps, excludeProps>;
}

export interface IEditFormProps<TDetailView, TSaveView = TDetailView>
  extends IFormProps<TDetailView, TSaveView> {
  /** 引用form实例 */
  refForm?: MutableRefObject<FormInstance<TSaveView> | undefined>;
  /** footer配置 */
  footerProps?: {
    /** 取消按钮 */
    cancelProps?: TFooterButtonProps;
    /** 重置按钮 */
    resetProps?: TFooterButtonProps;
    /** 提交按钮 */
    submitProps?: TFooterButtonProps;
  };
  /** 重绘footer */
  footer?: ReactNode | boolean;
  /** footer额外元素 */
  footerExtra?: ReactNode;

  /** 取消 */
  onCancel?: () => void;

  /** 提交表单 */
  onSubmit?: (value: TSaveView) => Promise<void>;
}
