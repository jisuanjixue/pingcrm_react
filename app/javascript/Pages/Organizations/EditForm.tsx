import React, { } from "react";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, message } from "antd";
import { useSignal } from "@preact/signals-react";
import { EditForm } from "jet-pro";


export default ({ visible, detail, onClose }) => {
  const isUpdate = !!detail?.id;
  const initDetail = async () => {
    let initData: any | undefined;
    if (isUpdate) {
      try {
        // const res = await detailRequest?.(detail?.id);
        // if (!res?.success) {
        //   message.error(res?.errorMessage);
        //   return initData;
        // }
        // initData = res.data;
      } catch (e: any) {
        message.error(e.message);
      }
    } else initData = detail;

    // if (editProps?.transFormDataBeforeRender)
    //   initData = await editProps.transFormDataBeforeRender(initData);

    return initData;
  }
  return (
    <EditForm.Drawer
      title={`${detail?.editItemId ? '编辑' : '新增'}公司`}
      width="30vw"
      footerProps={{ submitProps: { text: '确定' } }}
      visible={visible}
      onClose={onClose}
      initDetail={async () => undefined}
    >

    </EditForm.Drawer>
  );
}