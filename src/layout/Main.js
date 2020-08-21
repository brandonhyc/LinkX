import React, { Component } from 'react';

import AppFooter from './Footer'
import SatSettings from '../components/SatSettings';
import SatelliteList from '../components/SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constant';

import { Layout, Breadcrumb, Card, Collapse } from 'antd';
import Axios from 'axios';

const { Content, Sider } = Layout;
const { Panel } = Collapse;

const SETTINGS_PANEL = '1';
const LIST_PANEL = '2';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            loadingSatellites: false,
            activePanel: [ SETTINGS_PANEL ],
        }
    }  
    
    openPanel(keys) {
        this.setState ({
            activePanel: keys,
        })
    }

    showNearbySatellite = (setting) => {
        this.fetchSatellite(setting);
        this.openPanel( [LIST_PANEL] );
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
                <Sider width={400} 
                        style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        }} 
                        className="site-layout-background"
                >
                    
                      <Collapse activeKey={ this.state.activePanel }>
                        <Panel header="This is panel header 1" key="1">
                            <Card bordered={false}>
                                <SatSettings onConfirm={ this.showNearbySatellite } />
                            </Card>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <Card bordered={false} loading={ this.state.loadingSatellites }>
                                <SatelliteList class="overflow-auto" 
                                    onClickBack={ this.openPanel.bind(this, [ SETTINGS_PANEL ])}
                                    satInfo={ this.state.satInfo } />
                            </Card>
                        </Panel>
                    </Collapse>
                </Sider>
                <Layout className="pt-1 pb-3" style={{ marginLeft: 415, marginRight: 15 }}> 
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