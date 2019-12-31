import React from 'react';
import { PageHeader, Button, Descriptions, Menu, Icon, Layout, Row, Col } from 'antd';
import { css } from 'emotion';

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const Profile = props => {
  const { children } = props;
  return (
    <Layout style={{ flex: 1, height: '100%' }}>
      <Col style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Title"
          subTitle="This is a subtitle"
          extra={[
            <Button key="3"> Operation </Button>,
            <Button key="2"> Operation </Button>,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Created"> Lili Qu </Descriptions.Item>
            <Descriptions.Item label="Association">
              <a> 421421 </a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time"> 2017 - 01 - 10 </Descriptions.Item>
            <Descriptions.Item label="Effective Time"> 2017 - 10 - 10 </Descriptions.Item>
            <Descriptions.Item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <div
          className={css`
            height: 1rem;
            width: 100%;
          `}
        />
        <Row type="flex" justify="space-between" style={{ flex: 1, paddingBottom: '1rem' }}>
          <Sider style={{ height: '100%', background: '#fff' }}>
            <Menu
              style={{ height: '100%' }}
              onClick={() => {}}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>Navigation One</span>
                  </span>
                }
              >
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>Navigation Two</span>
                  </span>
                }
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="setting" />
                    <span>Navigation Three</span>
                  </span>
                }
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ flex: 1, padding: '0.5rem' }}> {children} </Content>
        </Row>
      </Col>
    </Layout>
  );
};
export default Profile;
