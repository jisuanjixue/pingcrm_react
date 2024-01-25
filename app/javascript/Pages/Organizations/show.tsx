import React, { useEffect } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { router } from '@inertiajs/react'
import * as Routes from "../../routes.js";
import { Button, Flex, Card } from "antd";
import { useSignal, useSignalEffect, batch } from "@preact/signals-react";
import type { OrganizationWithContacts } from '../../types/serializers'
import OrganizationDetail from "./OrganizationDetail"
import ConcatList from "./ConcatList"

const Index: React.FC = ({ organization, contacts }: { organization: OrganizationWithContacts, contacts: any }) => {
  const initialLoad = useSignal(true);

  useEffect(() => {
    initialLoad.value = false
  }, [organization])


  return (
    <>
      <PageContainer
        loading={initialLoad.value}
        extra={<></>}
        footer={[
          <Button key="back" onClick={() => console.log()}>
            返回
          </Button>,
        ]}
      >
        <Card>
          <OrganizationDetail {...{ organization }} />
        </Card>
        <Card>
          <ConcatList {...{ contacts: contacts }} />
        </Card>
      </PageContainer>
    </>
  );
};

export default Index;

