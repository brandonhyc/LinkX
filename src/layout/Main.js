import React, { Component } from 'react';

import { Layout, Breadcrumb, Card } from 'antd';

import AppFooter from './Footer'
import SatSettings from '../components/SatSettings';

const { Content, Sider } = Layout;

export default class Main extends Component {
    render() {
        return (
            <Layout>
                <Sider width={500} className="site-layout-background">
                    <Card title="Card title" bordered={true} style={{ width: '100%' }}>
                        <SatSettings></SatSettings>
                    </Card>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background h-100"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                    <div className="h-100"></div>
                    </Content>
                    <AppFooter style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</AppFooter>
                </Layout>
            </Layout>
        )
    }
}