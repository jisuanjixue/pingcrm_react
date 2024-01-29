import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, message } from "antd";
// import { useSignal } from "@preact/signals-react";
import { EditForm, EditFormItem } from "jet-pro";

/**
 * This is a functional component that renders a form drawer for editing or adding a company.
 *
 * @param {boolean} visible - Indicates whether the form drawer is visible or not.
 * @param {object} detail - The details of the company to be edited. If null, a new company will be added.
 * @param {function} onClose - Callback function to close the form drawer.
 * @param {object} initialLoadSignal - Signal object to trigger initial load.
 /**
  * Renders a form drawer component for editing or adding a company.
  * @param {boolean} visible - Indicates whether the form drawer is visible or not.
  * @param {object} detail - Contains the details of the company to be edited.
  * @param {function} onClose - Callback function to close the form drawer.
  * @param {object} initialLoadSignal - Signal object used to trigger an initial load.
  * @returns {JSX.Element} - The rendered form drawer component.
  */
export default function Default({ visible, detail, onClose, initialLoadSignal }) {
  /**
   * Asynchronously initializes the form data based on the detail object.
   * @returns {Promise<any | undefined>} - The initialized form data.
   */
  const initDetail = async () => {
    let initData;
    if (detail?.id) {
      try {
        initData = detail;
      } catch (e) {
        message.error(e.message);
      }
    } else {
      initData = undefined;
    }
    return initData;
  };

  /**
   * Handles form submission.
   * @param {object} data - The form data.
   * @returns {boolean} - Whether the form should submit or not.
   */
  const handleSubmit = (data) => {
    if (detail.id) {
      router.patch(Routes.organization_path(detail.id), data, {
        only: ['organizations'],
        onSuccess: () => {
          onClose();
          initialLoadSignal.value = true;
        },
        onError: (errors) => {
          message.error(errors.content);
        },
      });
    } else {
      router.post(Routes.organizations_path(), data, {
        only: ['organizations'],
        onSuccess: () => {
          onClose();
        },
        onError: (errors) => {
          message.error(errors.content);
        },
      });
    }
    return false;
  };

  return (
    <EditForm.Drawer
      title={`${detail?.id ? '编辑' : '新增'}公司`}
      width="30vw"
      footerProps={{ submitProps: { text: '确定' } }}
      visible={visible}
      onClose={onClose}
      initDetail={initDetail}
      onSubmit={handleSubmit}
    >
      <EditFormItem.Text label="名称" name="name" required />
      <EditFormItem.Text label="手机" name="phone" required />
      <EditFormItem.Text label="邮箱" name="email" />
      <EditFormItem.Text label="地址" name="address" required />
    </EditForm.Drawer>
  );
}