import React, { Component } from 'react';

import AppFooter from './Footer'
import SatSettings from '../components/SatSettings';
import SatelliteList from '../components/SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY, SATELLITE_POSITION_URL } from '../constant';

import { Layout, Card, Collapse } from 'antd';
import Axios from 'axios';

import spaceBackground from '../assets/images/space_background.jpg';
import Globe from '../components/Globe';

const { Content, Sider } = Layout;
const { Panel } = Collapse;

const SETTINGS_PANEL = '1';
const LIST_PANEL = '2';
const MINUTE = 60;
const MARKER_SIZE = 1;
const TRACE_COLORS = [ '#39FFAE', '#131147', '#0946A7', '#6749E7',];
const INTERVAL = 100;

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            loadingSatellites: false,
            activePanel: [ SETTINGS_PANEL ],
            loadingSatPositions: false,
            setting: undefined,
            selected: [],
            markers: [],
        }
    }  

    trackOnClick = (duration) => {
        const { observerLat, observerLong, observerAlt } = this.state.setting;
        duration = duration * MINUTE;
        this.setState({ loadingSatPositions: true });
        const statelliteFetches = this.state.selected.map( sat => {
            const { satid } = sat;
            const url = `${SATELLITE_POSITION_URL}/${satid}/${observerLat}/${observerLong}/${observerAlt}/${duration}/&apiKey=${SAT_API_KEY}`;
            return Axios.get(url);
        })

        Axios.all(statelliteFetches)
        .then(
          Axios.spread((...result) => {
              return result.map(item => item.data);
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
        const satellies = this.state.satPositions;
        satellies.forEach( (sat, satIndex) => {
            this.setState({ markers : [
                ...this.state.markers,
                ...sat.positions
                    .map((pos, index) => { return {
                        name: sat.info.satname,
                        id: sat.info.satid + '-' + index,
                        color: TRACE_COLORS[satIndex],
                        coordinates: [ pos.satlongitude, pos.satlatitude ],
                        value: MARKER_SIZE, 

                    }}
                    ).reduce((acc, cur, index) => { 
                        if (index % INTERVAL == 0) {
                            acc.unshift(cur);
                        }
                        return acc;
                    }, []),
            ]});
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
                        <Panel header="Location Settings" key="1">
                            <Card bordered={false}>
                                <SatSettings onConfirm={ this.showNearbySatellite } />
                            </Card>
                        </Panel>
                        <Panel header="Near Satellites" key="2">
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
                    <Globe markers={ this.state.markers }/>

                    </Content>
                    </div>
                    <AppFooter style={{ textAlign: 'center' }}></AppFooter>
                </Layout>
            </Layout>
        )
    }
}