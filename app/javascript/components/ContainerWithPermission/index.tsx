import type { ReactNode } from 'react';
import React from 'react';
import { hasPermission } from '../../utils/stringUtils';

/**
 * 权限props
 */
export interface IPermissionProps {
  /**
   * 需要的权限
   */
  required?: string[];
  /**
   * 拥有的权限
   */
  has?: string[];
}
export interface IProps extends IPermissionProps {
  children?: ReactNode;
}

/**
 * 带权限检查的容器
 */
const ContainerWithPermission = ({ required, has, children }: IProps) => {
  if (!hasPermission(required, has)) return <></>;

  return <>{children}</>;
};

export default ContainerWithPermission;
