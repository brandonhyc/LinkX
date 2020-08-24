import React, { Component } from 'react';

import AppFooter from './Footer'
import SatSettings from '../components/SatSettings';
import SatelliteList from '../components/SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY, SATELLITE_POSITION_URL } from '../constant';

import { Layout, Card, Collapse } from 'antd';
import Axios from 'axios';
import WorldMap from '../components/WorldMap';

import spaceBackground from '../assets/images/space_background.jpg';

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
            loadingSatPositions: false,
            setting: undefined,
            selected: [],
        }
    }  

    trackOnClick = (duration) => {
        const { observerLat, observerLong, observerAlt } = this.state.setting;
        const endTime = duration * 60;
        this.setState({ loadingSatPositions: true });
        const urls = this.state.selected.map( sat => {
            const { satid } = sat;
            const url = `${SATELLITE_POSITION_URL}/${satid}/${observerLat}/${observerLong}/${observerAlt}/${endTime}/&apiKey=${SAT_API_KEY}`;
            return Axios.get(url);
        })

        Axios.all(urls)
        .then(
          Axios.spread((...args) => {
              return args.map(item => item.data);
          })
        )
        .then( res => {
            this.setState({
                satPositions: res,
                loadingSatPositions: false,
            });
            this.showTrace();
        })
        .catch( e => {
            console.log('err in fetch satellite position -> ', e.message);
        })
    }

    addOrRemove = (item) => {
        console.log(this.state.selected);
        let { selected : previous } = this.state;
        let next = previous.includes(item) 
                 ? previous.filter(el => el.satid !== item.satid)
                 : [...previous, item];

        this.setState({ selected: next });
    }
    
    openPanel(keys) {
        this.setState ({
            activePanel: keys,
        })
    }

    showNearbySatellite = (setting) => {
        this.setState({ setting, });
        this.fetchSatellite(setting);
        this.openPanel( [LIST_PANEL] );
    }

    fetchSatellite = (setting) => {
        const {
            observerLat, 
            observerLong, 
            observerAlt, 
            radius,
            } = setting;

        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
  
        Axios.get(url)
            .then(response => {
                this.setState({
                    satInfo: response.data,
                    loadingSatellites: true,
                    selected: [],
                })
            })
            .catch(error => {
                console.error('err in fetch satellite -> ', error);
            })
            .then(res => {
                this.setState({
                    loadingSatellites: false,
                })
            });
    }

    showTrace = () => {
        console.log("start tracking");
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
                                    onClickBack={ () => this.openPanel([ SETTINGS_PANEL ]) }
                                    satInfo={ this.state.satInfo } 
                                    onSelectionChange={ this.addOrRemove }
                                    disableTrack={ this.state.selected.length === 0 }
                                    trackOnclick={ this.trackOnClick }
                                />
                            </Card>
                        </Panel>
                    </Collapse>
                </Sider>
                <Layout style={{ marginLeft: 400 }}> 
                    <div style={{ backgroundImage: `url(${ spaceBackground })`}}>
                    <Content
                        
                        style={{
                            margin: 0,
                            minHeight: 280,
                            
                        }}
                    >
                        <WorldMap />

                    </Content>
                    </div>
                    <AppFooter style={{ textAlign: 'center' }}></AppFooter>
                </Layout>
            </Layout>
        )
    }
}