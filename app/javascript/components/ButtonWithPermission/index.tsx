import type { ButtonProps } from 'antd/lib/button';
import { Button } from 'antd';
import type { IPermissionProps } from '../ContainerWithPermission';
import ContainerWithPermission from '../ContainerWithPermission';

export interface IProps extends IPermissionProps, ButtonProps { }

/**
 * 带权限检查的Button
 */
const ButtonWithPermission = ({ required, has, children, ...btnProps }: IProps) => (
  <ContainerWithPermission {...{ required, has }}>
    <Button {...btnProps}>{children}</Button>
  </ContainerWithPermission>
);

export default ButtonWithPermission;
