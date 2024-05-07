import { PageContainer } from "@ant-design/pro-components";
import { router } from "@inertiajs/react";
import { batch, useSignal, useSignalEffect } from "@preact/signals-react";
import React from "react";

import Table from "jet-pro/es/components/Table";
import { formatDateTime } from "jet-pro/es/utils/dateUtils";

import { convertToQueryParams } from "../../utils/util.js";

import type { Contact } from "../../types/serializers";

import * as Routes from "../../routes.js";

const Index: React.FC = ({ contacts, total }: { contacts: Contact[]; meta: any; total: number }) => {
  const initialLoadSignal = useSignal(false);
  const queryParams = useSignal({ page: 1, pageSize: 20, filters: undefined, sorts: undefined });

  const refresh = () => {
    router.get(
      Routes.contacts_path(),
      {
        page: queryParams.value.page,
        items: queryParams.value.pageSize,
        q: { ...convertToQueryParams(queryParams.value.filters), sorts: queryParams.value.sorts },
      },
      {
        replace: true,
        preserveState: true,
        preserveScroll: true,
        // onSuccess: () => {},
        onFinish: () => {
          initialLoadSignal.value = false;
        },
      }
    );
  };

  useSignalEffect(() => {
    if (initialLoadSignal.value) {
      refresh();
    }
  });

  return (
    <>
      <PageContainer>
        <Table.CRUD
          {...{
            columns: [
              { dataIndex: "id", isKey: true, hide: true },
              {
                title: "名称",
                dataIndex: "first_name",
                editProps: { required: true },
              },
              {
                title: "创建时间",
                dataIndex: "created_at",
                width: 80,
                hideEdit: true,
                render: val => formatDateTime(val, "YYYY-MM-DD HH:mm:ss"),
              },
            ],
            filterProps: {
              onSearch: () => {
                initialLoadSignal.value = true;
              },
            },
            queryEffectUrl: false,
            queryRequest: () => {
              return { data: contacts, total: total, success: true };
            },
            detailRequest: id => {
              console.log(
                contacts.find(f => f.id === id),
                id
              );
              return { data: contacts.find(f => f.id === id), success: true };
            },
            pagination: {
              onChange: (page, pageSize) => {
                batch(() => {
                  initialLoadSignal.value = true;
                  batch(() => {
                    queryParams.value = { ...queryParams.value, page: page, pageSize: pageSize };
                  });
                });
              },
            },
            saveRequest: values => {
              console.log("🚀 ~ values:", values);
              if (values.id) {
                router.patch(Routes.contact_path(values.id), values, {
                  only: ["contacts"],
                  onSuccess: () => {
                    router.reload();
                  },
                });
              } else {
                router.post(Routes.contacts_path(), values, {
                  only: ["contacts"],
                  onSuccess: () => {
                    router.reload();
                  },
                });
              }
              return { success: true };
            },
            deleteRequest: id => {
              router.delete(Routes.contact_path(id));
              return { success: true };
            },
          }}
        />
      </PageContainer>
    </>
  );
};

export default Index;
