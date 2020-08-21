import React, {Component} from 'react';
import { Button, List, Avatar, Checkbox, Spin } from 'antd';

import Satellite from "../assets/images/satellite.svg";

export default class SatelliteList extends Component {
    render() {

        const satList = this.props.satInfo ? this.props.satInfo.above : [];

        return (
            <div className="sat-list-box">
                <Button type="primary"
                        size="large">Track on the map</Button>
                <hr/>
                    <List
                        itemLayout="horizontal"
                        size="small"
                        dataSource={ satList }
                        renderItem={item => (
                            <List.Item
                                actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={Satellite} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                />
    
                            </List.Item>
                        )}
                    />
            </div>
        );
    }
}