import React from "react";
import { Head } from "@inertiajs/react";
// import * as timeago from "timeago.js";
import type { IProps } from "@/data-types/dashboard";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { useSignal, useSignalEffect } from "@preact/signals-react";


const Index: React.FC = ({ contacts, total }: IProps) => {
  const initialLoadSignal = useSignal(false);

  console.log("🚀 ~ file: index.tsx:12 ~ organizations:", contacts)
  // const query = async (params) => {
  //   const response = await router.get(Routes.organizations_path(Object.keys(params).length ? params : { remember: "forget" }), {
  //     preserveState: true,
  //     preserveScroll: true,
  //     replace: false,
  //     only: ["organizations"],
  //   });

  //   // Assuming the response data is in the format expected by IResponseListDataWithTotal<TBaseView>
  //   return { data: organizations.data, total: 10 };
  // };

  useSignalEffect(() => {
    if (initialLoadSignal.value) {
      router.get(Routes.organizations_path(), {
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
            queryRequest: (params) => {
              console.log("🚀 ~ file: index.tsx:1 ~ params:", params)
              return { data: contacts.data, total: total, success: true }
            },
            detailRequest: (id) => {
              return { data: contacts.data.find(f => f.id === id), success: true }
            },
            saveRequest: (values) => {
              if (values.id) {
                router.patch(Routes.contact_path(values.id), values, {
                  // onSuccess: () => {
                  //   router.reload()
                  // },
                  only: ['contacts']
                })
              } else {
                router.post(Routes.contacts_path(), values, {
                  // onSuccess: () => {
                  //   router.reload()
                  // },
                  only: ['contacts']
                })
              }
              return { success: true }
            },
            deleteRequest: async (id) => {
              router.delete(Routes.organization_path(id))
              await { success: true }
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Index;

