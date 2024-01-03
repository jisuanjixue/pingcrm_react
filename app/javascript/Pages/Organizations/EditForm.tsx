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
      onSubmit={async (data) => {
        console.log("🚀 ~ file: EditForm.tsx:29 ~ onSubmit={ ~ data:", data)
        if (detail.id) {
          router.patch(Routes.organization_path(detail.id), data, {
            only: ["organizations"],
            onSuccess: (page) => {
              onClose()
            },
            onError: (errors) => {
              message.error(errors.content)
            }
          })
        } else {

          router.post(Routes.organizations_path(data), data, {
            only: ["organizations"],
            onSuccess: (page) => {
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
    </EditForm.Drawer>
  );
}