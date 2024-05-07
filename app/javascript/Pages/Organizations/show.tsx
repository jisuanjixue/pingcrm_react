import { PageContainer } from "@ant-design/pro-components";
import { router } from "@inertiajs/react";
import { useSignal } from "@preact/signals-react";
import { Button, Card } from "antd";
import React, { useEffect } from "react";

import type { OrganizationWithContacts } from "../../types/serializers";

import * as Routes from "../../routes.js";
import ConcatList from "./ConcatList";
import OrganizationDetail from "./OrganizationDetail";

const Index: React.FC = ({ organization }: { organization: OrganizationWithContacts }) => {
  const initialLoad = useSignal(true);

  useEffect(() => {
    initialLoad.value = false;
  }, [organization]);

  return (
    <>
      <PageContainer
        loading={initialLoad.value}
        extra={<></>}
        title={<></>}
        footer={[
          <Button key="back" onClick={() => console.log()}>
            返回
          </Button>,
        ]}
      >
        <Card className="mb-4">
          <OrganizationDetail {...{ organization }} />
        </Card>
        <Card>
          <ConcatList {...{ contacts: organization.contacts }} />
        </Card>
      </PageContainer>
    </>
  );
};

export default Index;
