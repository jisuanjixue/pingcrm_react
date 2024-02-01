import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useCountDown } from "ahooks";
import { ResultStatusType } from 'antd/es/result';
import { router } from "@inertiajs/react";
import * as Routes from "../routes"

const App: React.FC = ({ status }: { status: ResultStatusType | undefined }) => {
  const [countdown, formattedRes] = useCountDown({ leftTime: 10 * 1000 });
  const { seconds } = formattedRes;

  useEffect(() => {
    if (countdown === 0) {
      router.get(Routes.root_path())
    }
  }, [countdown]);

  const handBack = () => {
    router.get(Routes.root_path())
  };
  return (
    <Result
      status={status}
      title={`${seconds}秒后跳到统计分析页面`}
      subTitle={(() => {
        if (status === '500') return "抱歉，出了一些问题"
        if (status === '403') return "对不起，您访问的页面不存在"
        if (status === '404') return "对不起，您访问的页面不存在"
      })()}
      extra={[
        <Button type="primary" onClick={() => handBack()}>
          返回首页
        </Button>
      ]}
    >
    </Result>
  );
}


export default App;