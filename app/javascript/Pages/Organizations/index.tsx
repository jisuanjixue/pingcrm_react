import React, { useEffect, useRef } from "react";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, Card, Divider, Popconfirm, message, Form, Space, FormInstance, Flex } from "antd";
import { useSignal, useSignalEffect, batch } from "@preact/signals-react";
import EditForms from "./EditForm";
import { EditForm, EditFormItem } from "jet-pro";


const Dashboard: React.FC = ({ organizations, total }: IProps) => {
  const initialLoadSignal = useSignal(false);
  const queryParams = useSignal({ page: 1, items: 20, filter: undefined, sorter: undefined })
  const refForm = useRef<FormInstance>();
  // const [form] = Form.useForm()
  const editState = useSignal<{
    visible?: boolean;
    detail?: any;
  }>({})

  const editProps = {
    editState
  }

  const convertToQueryParams = (obj) => {
    console.log("🚀 ~ file: index.tsx:28 ~ convertToQueryParams ~ obj:", obj)
    if (typeof obj !== 'undefined') {
      let result = {};
      for (let key in obj) {
        if (!obj[key]) delete obj[key];
        result[key + '_cont'] = obj[key];
      }
      return result;
    }
  }

  useSignalEffect(() => {
    if (initialLoadSignal.value) {
      console.log(queryParams.value.filter)
      router.get(Routes.organizations_path(), {
        page: queryParams.value.page,
        items: queryParams.value.items,
        q: convertToQueryParams(queryParams.value.filter)
      }, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          initialLoadSignal.value = false
        }
      })
    }
  })

  return (
    <>
      <PageContainer>
        <div className="mb-8">
          <EditForm
            {...{
              refForm,
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
          </EditForm>
        </div>
        <Table.Pro
          {...{
            columns: [
              {
                title: '名称',
                dataIndex: 'name',
                editProps: { required: true },
                width: 80,
                sorter: (a, b) => a.name.length - b.name.length,
                // render: (value) => console.log(value)
              },
              { title: '邮箱', dataIndex: 'email', width: 80, editProps: { required: true } },
              { title: '手机', dataIndex: 'phone', width: 80, editProps: { required: true } },
              { title: '地址', dataIndex: 'address', width: 80, editProps: { required: true } },
            ],
            toolbarProps: {
              extra: (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    editState.value = { visible: true, detail: {} }
                  }}
                >
                  新增
                </Button>
              )
            },
            actionColumn: {
              width: 60,
              title: '操作',
              render: (item) => (
                <>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      editState.value = { visible: true, detail: item }
                    }}
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
            dataSource: organizations.data,
            pagination: {
              pageSize: organizations.meta.items,
              total: total,
              current: organizations.meta.page,
              showTotal: (total) => `总 ${total} 条`,
              defaultPageSize: 20,
              defaultCurrent: 1,
              hideOnSinglePage: true,
              showQuickJumper: true,
            },
            onChange(pagination) {
              console.log("🚀 ~ file: index.tsx:166 ~ onChange ~ sorter:", pagination)
              batch(() => {
                initialLoadSignal.value = true
                queryParams.value = {
                  ...queryParams.value,
                  page: pagination.current ?? 1,
                  items: pagination.pageSize ?? 20
                }
              })
            }
          }}
        />
        <EditForms
          {...{
            ...editProps,
            visible: editState?.value.visible,
            detail: editState?.value.detail,
            onClose: () => editState.value = { visible: false, detail: undefined },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Dashboard;

