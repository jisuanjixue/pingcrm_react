import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, message } from "antd";
// import { useSignal } from "@preact/signals-react";
import { EditForm, EditFormItem } from "jet-pro";


export default ({ visible, detail, onClose }) => {
  console.log("🚀 ~ file: EditForm.tsx:9 ~ detail:", detail)
  const initDetail = async () => {
    let initData: any | undefined;
    if (detail?.id) {
      try {
        initData = detail
      } catch (e: any) {
        message.error(e.message);
      }
    } else initData = undefined;
    return initData;
  }
  return (
    <EditForm.Drawer
      title={`${detail?.id ? '编辑' : '新增'}公司`}
      width="30vw"
      footerProps={{ submitProps: { text: '确定' } }}
      visible={visible}
      onClose={onClose}
      initDetail={initDetail}
      onSubmit={(data) => {
        if (detail.id) {
          router.patch(Routes.organization_path(detail.id), data, {
            only: ["organizations"],
            onSuccess: () => {
              onClose()
              router.reload()
            },
            onError: (errors) => {
              message.error(errors.content)
            }
          })
        } else {

          router.post(Routes.organizations_path(), data, {
            only: ["organizations"],
            onSuccess: () => {
              onClose()
            },
            onError: (errors) => {
              message.error(errors.content)
            }
          })
        }
        return false;
      }}
    >
      {/* <EditFormItem.Hidden name="id" style={{ display: "hide" }} /> */}
      <EditFormItem.Text label="名称" name="name" required></EditFormItem.Text>
      <EditFormItem.Text label="手机" name="phone" required></EditFormItem.Text>
      <EditFormItem.Text label="地址" name="address" required></EditFormItem.Text>
    </EditForm.Drawer>
  );
}