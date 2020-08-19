import React, {Component} from 'react';
import starlinkLogo  from '../assets/images/Starlink_Logo.svg';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default class AppHeader extends Component {
    render() {
        return (
            <Header className="header">
                <div className="logo"> 
                    <img src={ starlinkLogo } className="App-logo" alt="logo" />
                </div>
                {/* <div className="App-logo">
                    
                    <p className="title">
                        StarLink Tracker
                    </p>
                </div> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        )
    }
}