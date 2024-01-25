import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, Divider, Popconfirm, message, FormInstance, Flex, Card } from "antd";
import { useSignal, useSignalEffect, batch } from "@preact/signals-react";
// import EditForms from "./EditForm";
// import { EditForm, EditFormItem } from "jet-pro";
import { formatDateTime } from 'jet-pro/es/utils/dateUtils';
import { isType } from "@/utils/util.js";
import type { OrganizationWithContacts } from '../../types/serializers'
import OrganizationDetail from "./OrganizationDetail"
import ConcatList from "./ConcatList"

const Index: React.FC = ({ organization, contacts }: { organization: OrganizationWithContacts, contacts: any }) => {
  console.log("🚀 ~ contacts:", contacts)
  const initialLoadSignal = useSignal(false);
  // const selectedRowKeys = useSignal<React.Key[]>([])
  // const queryParams = useSignal({ page: 1, items: 20, filter: undefined, sorter: undefined })
  // const refForm = useRef<FormInstance>();
  // const editState = useSignal<{
  //   visible?: boolean;
  //   detail?: any;
  // }>({})

  // const editProps = {
  //   initialLoadSignal
  // }

  // const convertToQueryParams = (obj) => {
  //   if (typeof obj !== 'undefined') {
  //     let result = {};
  //     for (let key in obj) {
  //       if (!obj[key]) delete obj[key];
  //       result[key + '_cont'] = obj[key];
  //     }
  //     return result;
  //   }
  // }


  useSignalEffect(() => {

    // if (initialLoadSignal.value) {
    //   console.log(queryParams.value)
    //   router.get(Routes.organizations_path(), {
    //     page: queryParams.value.page,
    //     items: queryParams.value.items,
    //     q: { ...convertToQueryParams(queryParams.value.filter), sorts: queryParams.value.sorter }
    //   }, {
    //     preserveState: true,
    //     preserveScroll: true,
    //     onBefore: visit => {
    //       // console.log("🚀 ~ router.get ~ response:", visit)

    //     },
    //     onFinish: (response) => {
    //       console.log("🚀 ~ router.get ~ response:", response)
    //       initialLoadSignal.value = false
    //     }
    //   })
    // }
  })

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   selectedRowKeys.value = newSelectedRowKeys
  // };

  // const rowSelection = {
  //   selectedRowKeys: selectedRowKeys.value,
  //   onChange: onSelectChange,
  // };

  return (
    <>
      <PageContainer
        header={{ title: '公司详情' }}
        // loading={loading}
        extra={<></>}
        footer={[
          <Button key="back" onClick={() => console.log()}>
            返回
          </Button>,
        ]}
      >
        <Card>
          <OrganizationDetail {...{ organization }} />
        </Card>
        <Card>
          <ConcatList {...{ contacts: contacts }} />
        </Card>
        {/* <Card style={{ marginTop: 10, marginBottom: 10 }}>
        <RulesList detail={detail} />
      </Card>
      <Card>
        <LogsList detail={detail} />
      </Card> */}
        {/* <div style={{ marginTop: 20, backgroundColor: 'white', padding: 0 }}>
        <Row gutter={24}>
          <Col span={12}>
            <LogsList detail={detail} />
          </Col>
          <Col span={12}>
            <RulesList detail={detail} />
          </Col>
        </Row>
      </div> */}
      </PageContainer>
    </>
  );
};

export default Index;

