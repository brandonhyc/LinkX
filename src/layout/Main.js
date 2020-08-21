import React, { Component } from 'react';

import AppFooter from './Footer'
import SatSettings from '../components/SatSettings';
import SatelliteList from '../components/SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constant';

import { Layout, Breadcrumb, Card } from 'antd';
import Axios from 'axios';

const { Content, Sider } = Layout;

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            loadingSatellites: false,
        }
    }  

    showNearbySatellite = (setting) => {
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        const {
            observerLat, 
            observerLong, 
            observerAlt, 
            radius
            } = setting;

        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
  
        Axios.get(url)
            .then(response => {
                this.setState({
                    satInfo: response.data,
                    loadingSatellites: true,
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })
            .then(res => {
                this.setState({
                    loadingSatellites: false,
                })
            });
    }

    render() {
        return (
            <Layout>
                <Sider width={500} className="site-layout-background" >
                    <Card title="Card title" bordered={true}>
                        <SatSettings onConfirm={ this.showNearbySatellite } />
                    </Card>
                    <Card title="Card title" bordered={true} loading={ this.state.loadingSatellites }>
                        <SatelliteList class="overflow-auto" satInfo={ this.state.satInfo } />
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