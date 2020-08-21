import React, {Component} from 'react';
import starlinkLogo  from '../assets/images/starlink_white.png';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default class AppHeader extends Component {
    render() {
        return (
            <Header className="header">
                <div className="text-right"> 
                    <img src={ starlinkLogo } className="App-logo" alt="logo" />
                </div>
                {/* <div className="App-logo">
                    
                    <p className="title">
                        StarLink Tracker
                    </p>
                </div> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                </Menu>
            </Header>
        )
    }
}