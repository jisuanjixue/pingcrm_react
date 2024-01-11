import React from "react";
// import { Head } from "@inertiajs/react";
// import * as timeago from "timeago.js";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { useSignal, useSignalEffect } from "@preact/signals-react";


const Index: React.FC = ({ contacts, total }: IProps) => {
  const initialLoadSignal = useSignal(false);
  const queryParams = useSignal({ page: 1, pageSize: 20, filters: [], sorts: [] })
  const convertToQueryParams = (arr) => {
    if (arr.length > 0) {
      let result = {};
      for (let key in arr) {
        if (!arr[key]) delete arr[key];
        result[key + '_cont'] = arr[key];
      }
      return result;
    }
  }

  console.log("🚀 ~ file: index.tsx:12 ~ organizations:", contacts)

  useSignalEffect(() => {
    if (initialLoadSignal.value) {
      router.get(Routes.contacts_path(), {
        page: queryParams.value.page,
        items: queryParams.value.pageSize,
        q: { ...convertToQueryParams(queryParams.value.filters), sorts: queryParams.value.sorts }
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
            queryEffectUrl: false,
            queryRequest: (params) => {
              queryParams.value = { ...params }
              return { data: contacts.data, total: total, success: true }
            },
            detailRequest: (id) => {
              return { data: contacts.data.find(f => f.id === id), success: true }
            },
            pagination: {
              onChange: () => {
                initialLoadSignal.value = true
              },
            },
            saveRequest: (values) => {
              if (values.id) {
                router.patch(Routes.contact_path(values.id), values, {
                  only: ['contacts']
                })
              } else {
                router.post(Routes.contacts_path(), values, {
                  only: ['contacts']
                })
              }
              return { success: true }
            },
            deleteRequest: (id) => {
              router.delete(Routes.contact_path(id))
              return { success: true }
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Index;

