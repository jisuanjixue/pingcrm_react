
import React, { useRef } from "react";
import { PageContainer } from "@ant-design/pro-components";
// import Table from "@/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, Divider, Popconfirm, message, FormInstance, Flex } from "antd";
import { useSignal, useSignalEffect } from "@preact/signals-react";
// import EditForms from "./EditForm";
// import { EditForm, EditFormItem } from "jet-pro";
import { formatDateTime } from '@/utils/dateUtils';
import { isType } from "@/utils/util.js";
// import type { Organization } from '../../types/serializers'

const Index: React.FC = ({ contacts }: { contacts: any }) => {
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
      <PageContainer>
        <div className="mb-8">
          {/* <EditForm
            {...{
              // refForm,
              initDetail: async () => undefined,
              footer: <div className="flex justify-end"></div>

            }}
          >
            <Flex justify="space-between" align="center">
              <Flex wrap="wrap" gap="middle" justify="flex-start" align="center">
                <EditFormItem.Text name="name" label="名称"></EditFormItem.Text>
                <EditFormItem.Text name="phone" label="手机"></EditFormItem.Text>
              </Flex>
              <Flex justify="flex-start" gap="small">
                <Button
                  onClick={() => {
                    batch(() => {
                      queryParams.value.filter = undefined
                      initialLoadSignal.value = true
                    })
                    refForm.current?.resetFields()
                  }}>重置</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    batch(() => {
                      initialLoadSignal.value = true
                      queryParams.value.filter = refForm?.current?.getFieldsValue()
                      queryParams.value.page = 1
                    })
                  }}>查询</Button>
              </Flex>
            </Flex>
          </EditForm> */}
        </div>
        {/* <Table.Pro
          {...{
            columns: [
              {
                title: '名称',
                dataIndex: 'name',
                editProps: { required: true },
                width: 80,
                sorter: {
                  compare: (a, b) => a.name.length - b.name.length,
                  multiple: 2,
                },
                // render: (value) => console.log(value)
              },
              { title: '邮箱', dataIndex: 'email', width: 80, editProps: { required: true } },
              {
                title: '手机', dataIndex: 'phone', width: 80,
                sorter: {
                  compare: (a, b) => a?.phone?.length - b?.phone?.length,
                  multiple: 1,
                },
                editProps: { required: true }
              },
              { title: '地址', dataIndex: 'address', width: 80, editProps: { required: true } },
              {
                title: '创建时间',
                dataIndex: 'created_at',
                width: 80,
                hideEdit: true,
                render: (val) => formatDateTime(val, "YYYY-MM-DD HH:mm:ss")
              },
            ],
            toolbarProps: {
              extra: (
                <Button
                  type="primary"
                  size="small"
                // onClick={() => {
                //   editState.value = { visible: true, detail: {} }
                // }}
                >
                  新增
                </Button>
              )
            },
            // rowSelection: { rowSelection },
            actionColumn: {
              width: 100,
              title: '操作',
              render: (item) => (
                <>
                  <Button type="link" onClick={() => router.get(Routes.organization_path(item.id))}>
                    详情
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                  // onClick={() => {
                  //   editState.value = { visible: true, detail: item }
                  // }}
                  >
                    修改
                  </Button>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="是否确定删除？"
                    onConfirm={() => {
                      router.delete(Routes.organization_path(item.id), {
                        onSuccess: () => {
                          message.success("删除成功！")
                        }
                      })
                    }}
                  >
                    <Button size="small" type="default" danger color="#f42f2f">
                      删除
                    </Button>
                    <Divider type="vertical" />
                  </Popconfirm>
                </>
              )
            },

            queryEffectUrl: false,
            dataSource: contacts.lists,
            pagination: {
              pageSize: contacts.meta.items,
              total: contacts.total,
              current: contacts.meta.page,
              showTotal: (total) => `总 ${total} 条`,
              defaultPageSize: 20,
              defaultCurrent: 1,
              hideOnSinglePage: true,
              showQuickJumper: true,
            },
            onChange(pagination, _, sorter) {
              const newSorter = isType(sorter, 'array') ? sorter : [sorter]
              const sorterCol = newSorter?.map(v => `${v.field} ${v.order === 'ascend' ? 'asc' : 'desc'}`)
              // batch(() => {
              //   initialLoadSignal.value = true
              //   queryParams.value = {
              //     ...queryParams.value,
              //     page: pagination.current ?? 1,
              //     items: pagination.pageSize ?? 20,
              //     sorter: sorterCol
              //   }
              // })
            }
          }}
        /> */}
        {/* <EditForms
          {...{
            ...editProps,
            visible: editState?.value.visible,
            detail: editState?.value.detail,
            onClose: () => editState.value = { visible: false, detail: undefined },
          }}
        /> */}
      </PageContainer>
    </>
  );
};

export default Index;

