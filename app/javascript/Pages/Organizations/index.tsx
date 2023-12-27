import React from "react";
import { Head } from "@inertiajs/react";
// import * as timeago from "timeago.js";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { IResponseData, IResponseListDataWithTotal } from "jet-pro/es/dataTypes/response.js";
import { TBaseView } from "jet-pro/es/components/Table/ProTable/interface.js";


const Dashboard: React.FC = ({ organizations }: IProps) => {
  console.log("🚀 ~ file: index.tsx:12 ~ organizations:", organizations)
  const query = async (params) => {
    const response = await router.get(Routes.organizations_path(Object.keys(params).length ? params : { remember: "forget" }), {
      preserveState: true,
      preserveScroll: true,
      replace: false,
      only: ["organizations"],
    });

    // Assuming the response data is in the format expected by IResponseListDataWithTotal<TBaseView>
    return { data: organizations.data, total: 10 };
  };
  return (
    <>
      <PageContainer>
        <Table.CRUD
          {...{
            columns: [
              { dataIndex: 'id', isKey: true, hide: true },
              {
                title: '名称',
                dataIndex: 'name',
                editProps: { required: true },
                // render: (value) => console.log(value)
              },
              // { title: '邮箱', dataIndex: 'email', editProps: { required: true } },
            ],
            queryRequest: (params) => {
              return new Promise<IResponseListDataWithTotal<TBaseView>>(async (resolve, reject) => {
                try {
                  resolve({ data: organizations.data, total: 10, success: true });
                } catch (error) {
                  reject(error);
                }
              });
            },
            detailRequest: async (id) => {
              return new Promise<IResponseData<TBaseView>>(async (resolve, reject) => {
                try {
                  resolve({ data: organizations.data.find(f => f.id === id), success: true });
                } catch (error) {
                  reject(error);
                }
              });
            }
            // saveRequest: (values) => {
            //   return docSvc.save(valuesToSubmit);
            // },
            // deleteRequest: docSvc.deleteById,
          }}
        />
      </PageContainer>
    </>
  );
};

export default Dashboard;

