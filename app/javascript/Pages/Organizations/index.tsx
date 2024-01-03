import React, { } from "react";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button } from "antd";
import { useSignal } from "@preact/signals-react";
import EditForm from "./EditForm";


const Dashboard: React.FC = ({ organizations, total }: IProps) => {
  const editState = useSignal<{
    visible?: boolean;
    detail?: any;
  }>({})

  const editProps = {
  }

  return (
    <>
      <PageContainer>
        <Table.Pro
          {...{
            columns: [
              {
                title: '名称',
                dataIndex: 'name',
                editProps: { required: true },
                // render: (value) => console.log(value)
              },
              // { title: '邮箱', dataIndex: 'email', editProps: { required: true } },
            ],
            toolbarProps: {
              extra: (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    editState.value = { visible: true, detail: undefined }
                  }}
                >
                  新增
                </Button>
              )
            },
            actionColumn: {
              width: 20,
              title: '操作',
              render: (item) => (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    editState.value = { visible: true, detail: item }
                  }}
                >
                  修改
                </Button>
              )
            },
            queryEffectUrl: false,
            dataSource: organizations.data,
            pagination: {
              pageSize: organizations.meta.items,
              total: total,
              current: organizations.meta.page,
              showTotal: (total) => `Total ${total} items`,
              defaultPageSize: 20,
              defaultCurrent: 1,
              hideOnSinglePage: true,
              showQuickJumper: true,
            },
            onChange(pagination, filters, sorter, extra) {
              router.get(Routes.organizations_path(), {
                page: pagination.current,
                items: pagination.pageSize
              }, {
                preserveState: false,
                preserveScroll: true,
              })
            }
          }}
        />
        <EditForm
          {...{
            ...editProps,
            // columns: propsColumns,
            visible: editState?.value.visible,
            detail: editState?.value.detail,
            onSuccess: () => {
              // refAction.current?.reload?.();
            },
            onClose: () => editState.value = { visible: false, detail: undefined },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Dashboard;

