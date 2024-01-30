import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import Table from "jet-pro/es/components/Table";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { batch, useSignal, useSignalEffect } from "@preact/signals-react";
import { convertToQueryParams } from "../../utils/util.js";
import type { Contact } from '../../types/serializers';


const Index: React.FC = ({ contacts, total }: { contacts: Contact, meta: any, total: number }) => {
  console.log("🚀 ~ contacts:", contacts)
  const initialLoadSignal = useSignal(false);
  const queryParams = useSignal({ page: 1, pageSize: 20, filters: undefined, sorts: undefined });

  const refresh = () => {
    console.log(queryParams.value)
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
  };

  useSignalEffect(() => {
    if (initialLoadSignal.value) {
      refresh()
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
                dataIndex: 'first_name',
                editProps: { required: true },
              },
            ],
            filterProps: {
              onSearch: () => {
                initialLoadSignal.value = true
              }
            },
            queryEffectUrl: false,
            queryRequest: () => {
              return { data: contacts, total: total, success: true }
            },
            detailRequest: (id) => {
              return { data: contacts.find(f => f.id === id), success: true }
            },
            pagination: {
              onChange: (page, pageSize) => {
                batch(() => {
                  queryParams.value = { ...queryParams.value, page: page, pageSize: pageSize };
                  batch(() => {
                    initialLoadSignal.value = true;
                  })
                });
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

