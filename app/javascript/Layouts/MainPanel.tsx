import React from "react";
import { usePage } from "@inertiajs/react";
import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout, SettingDrawer, ProCard } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { useSignal } from "@preact/signals-react";
import defaultProps from './_defaultProps';

const MainPanel: React.FC = props => {
  const settings = useSignal<Partial<ProSettings> | undefined>({ layout: 'side' })
  const pathname = useSignal('/list/sub-page/sub-sub-page1')
  const {
    auth: { user },
  } = usePage().props as any;
  const { variant, children, ...rest } = props as any;

  // Pass the computed styles into the `__css` prop
  return (
    <>
      {
        user ? <div
          id="test-pro-layout"
          style={{
            height: '100vh',
          }}
        >
          <ProLayout
            token={{
              header: {
                colorBgHeader: '#292f33',
                colorHeaderTitle: '#fff',
                colorTextMenu: '#dfdfdf',
                colorTextMenuSecondary: '#dfdfdf',
                colorTextMenuSelected: '#fff',
                colorBgMenuItemSelected: '#22272b',
                colorTextMenuActive: 'rgba(255,255,255,0.85)',
                colorTextRightActionsItem: '#dfdfdf',
              },
              colorTextAppListIconHover: '#fff',
              colorTextAppListIcon: '#dfdfdf',
              sider: {
                colorMenuBackground: '#fff',
                colorMenuItemDivider: '#dfdfdf',
                colorBgMenuItemHover: '#f6f6f6',
                colorTextMenu: '#595959',
                colorTextMenuSelected: '#242424',
                colorTextMenuActive: '#242424',
                colorBgMenuItemCollapsedHover: '#242424',
              },
            }}
            siderWidth={216}
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...defaultProps}
            location={{ pathname: pathname.value }}
            menu={{
              type: 'group',
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              title: '七妮妮',
              size: 'small',
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                  <div
                    key="SearchOutlined"
                    aria-hidden
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginInlineEnd: 24,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <Input
                      style={{
                        borderRadius: 4,
                        marginInlineEnd: 12,
                        backgroundColor: 'rgba(57,62,67,1)',
                        color: '#fff',
                      }}
                      prefix={
                        <SearchOutlined
                          style={{
                            color: '#dfdfdf',
                          }}
                        />
                      }
                      placeholder="搜索方案"
                      bordered={false}
                    />
                    <PlusCircleFilled
                      style={{
                        color: 'var(--ant-primary-color)',
                        fontSize: 24,
                      }}
                    />
                  </div>
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2021 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <a
                onClick={() => {
                  pathname.value = item.path || '/welcome';
                }}
              >
                {dom}
              </a>
            )}
            {...settings}
          >
            <PageContainer
              breadcrumb={{
                routes: [],
              }}
              onBack={() => window.history.back()}
              extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
                <Button key="1" type="primary">
                  主操作
                </Button>,
              ]}
              footer={[
                <Button key="3">重置</Button>,
                <Button key="2" type="primary">
                  提交
                </Button>,
              ]}
            >
              <ProCard
                style={{
                  height: '100vh',
                  minHeight: 800,
                }}
              >
                <div></div>
              </ProCard>
            </PageContainer>
          </ProLayout>
          <SettingDrawer
            pathname={pathname.value}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings.value}
            onSettingChange={(changeSetting) => {
              settings.value = changeSetting
            }}
            disableUrlParams={false}
          />
        </div> : <div>{children}</div>
      }

    </>
  );
};

export default page => <MainPanel>{page}</MainPanel>;
