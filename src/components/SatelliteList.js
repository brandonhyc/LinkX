import React, {Component} from 'react';
import { Button, List, Avatar, Checkbox } from 'antd';

import Satellite from "../assets/images/satellite_color.svg";

export default class SatelliteList extends Component {

    constructor() {
        super();
        this.state = {
            duration: 0,
        }
    }

    onChange = e => {
        console.log(e);
        const { dataItem, checked } = e.target;
        this.props.onSelectionChange(dataItem, checked);
    }

    onChangeDuration = (value) => {
        this.setState({
            duration: value
        })
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];

        return (
            <div className="sat-list-box">
                <Button type="primary" onClick={ this.props.onClickBack }
                        >Back</Button>
                <Button className="ml-3" type="primary"
                        disabled={ this.props.disableTrack }
                        onClick={ () => this.props.trackOnclick(this.state.duration) }
                >Track on the map</Button>
                <hr/>
                <List
                    itemLayout="horizontal"
                    size="small"
                    dataSource={ satList }
                    renderItem={item => (
                        <List.Item
                            actions={[<Checkbox dataItem={ item } onChange={ this.onChange }/>]}
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