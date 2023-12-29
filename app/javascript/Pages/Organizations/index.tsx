import React, { } from "react";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";


const Dashboard: React.FC = ({ organizations, total }: IProps) => {

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
      </PageContainer>
    </>
  );
};

export default Dashboard;

