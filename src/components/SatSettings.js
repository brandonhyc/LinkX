import React, {Component} from 'react';
import { InputNumber } from 'antd';

export default class SatSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            observerLong: 0,
            observerLat: 0,
            observerElevation: 0,
        }
    }

    onChangeLongitude = (value) => {
        console.log('changed', value);
        this.setState({
            observerLong: value
        });
    }

    onChangeLatitude = (value) => {
        console.log('changed', value);
        this.setState({
            observerLat: value
        });
    }

    onChangeEle = (value) => {
        console.log('changed', value);
        this.setState({
            observerElevation: value
        });
    }

    render() {
        return (        
            <div className="sat-setting">
                <div className="loc-setting">
                    <div className="setting-list">
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
                            <label class="col-4 text-right" htmlFor="elevation">Elevation(meters): </label>
                            <div className="col-6">
                                <InputNumber name="elevation" 
                                    min={-413} max={8850} 
                                    defaultValue={0} 
                                    className="d-inline-block w-100"
                                    onChange={ this.onChangeEle } 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}