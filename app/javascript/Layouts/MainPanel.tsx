import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
// import * as Routes from "../utils/routes.js";
// import * as Routes from "../routes.js";
import { PageContainer, ProLayout, SettingDrawer, ProCard, ProBreadcrumb } from '@ant-design/pro-components';
import { Breadcrumb, Button, Input } from 'antd';
import { useSignal } from "@preact/signals-react";
import defaultProps from './_defaultProps';

const MainPanel: React.FC = props => {
  const settings = useSignal<Partial<ProSettings> | undefined>({ layout: 'side', splitMenus: true, })
  const pathname = useSignal('')
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
            {...defaultProps}
            {...settings}
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
            // location={{
            //   route: pathname.value,
            //   pathname: "/organizations"
            // }}
            menu={{
              type: 'group',
            }}
            breadcrumbRender={(route) => {
              // console.log(route)
              return route
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
            menuItemRender={(item, dom) => {
              return (
                <Link
                  href={item.path || '/'}
                  preserveState={false}
                  preserveScroll={true}
                >{
                    dom
                  }
                </Link>
              )
            }}
          >
            <PageContainer
              breadcrumb={{
                routes: [],
              }}
              // header={{
              //   title: "标题",
              //   breadcrumbRender: () => {
              //     return <Breadcrumb routes={routes} itemRender={itemRender} />;
              //   },
              // }}
              onBack={() => window.history.back()}
              extra={undefined}
              footer={undefined}
            >
              {children}
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
