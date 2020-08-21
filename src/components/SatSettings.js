import React, {Component} from 'react';
import { InputNumber, Button, Divider } from 'antd';

export default class SatSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            observerLong: 0,
            observerLat: 0,
            observerAlt: 0,
            radius: 90,
        }
    }

    onChangeLongitude = (value) => {
        this.setState({
            observerLong: value,
        });
    }

    onChangeLatitude = (value) => {
        this.setState({
            observerLat: value,
        });
    }

    onChangeAlt = (value) => {
        this.setState({
            observerAlt: value,
        });
    }

    onChangeRadius = (value) => {
        this.setState({
            radius: value
        })
    }

    showSatellite = () => {
        this.props.onConfirm(this.state);
    }

    render() {
        return (        
            <div className="sat-setting">
                <div className="loc-setting">
                    <div className="setting-list">
                        <Divider orientation="left">From Location</Divider>
                        <div className="row pt-2">
                            <label class="col-4 text-right" htmlFor="longitude">Longitude: </label>
                            <div className="col-6">
                                <InputNumber name="longitude" 
                                    min={-180} max={180} 
                                    defaultValue={0} 
                                    className="d-inline-block w-100"
                                    onChange={ this.onChangeLongitude } 
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <label class="col-4 text-right" htmlFor="latitude">Latitude: </label>
                            <div className="col-6">
                                <InputNumber name="latitude" 
                                    min={-90} max={90} 
                                    defaultValue={0} 
                                    className="d-inline-block w-100"
                                    onChange={ this.onChangeLatitude } 
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <label class="col-4 text-right" htmlFor="altitude">Altitude(meters): </label>
                            <div className="col-6">
                                <InputNumber name="altitude" 
                                    min={-413} max={8850} 
                                    defaultValue={0} 
                                    className="d-inline-block w-100"
                                    onChange={ this.onChangeAlt } 
                                />
                            </div>
                        </div>
                    </div>

                    <Divider orientation="left">From Location</Divider>
                    <div className="setting-list">
                        <div className="list-item">
                            <label>Search Radius </label>
                            <InputNumber
                                min={0}
                                max={90}
                                defaultValue={0}
                                style={{margin: "0 2px"}}
                                onChange={ this.onChangeRadius }
                            />
                        </div>
                    </div>

                    <div className="show-nearby">
                        <Button
                            type="primary"
                            size="large"
                            onClick={ this.showSatellite }
                        >
                            Find Nearby Satellites
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}