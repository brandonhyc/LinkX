import React, { Component } from 'react';

import { Layout, Breadcrumb } from 'antd';

import AppFooter from './Footer'

const { Content, Sider } = Layout;

export default class Main extends Component {
    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <div style={{ height: '100%' }}>left</div>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                    Content
                    </Content>
                    <AppFooter style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</AppFooter>
                </Layout>
            </Layout>
        )
    }
}