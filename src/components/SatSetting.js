import React, {Component} from 'react';

export default class SatSetting extends Component {
    constructor() {
        super();
        this.state = {
            observerLat: 0,
            observerLong: 0,
        }
    }

    onChangeLong = (value) => {
        console.log("SatSetting -> onChangeLong -> value", value)
        
    }

    render() {
        <div className="sat-setting"> 
            <div className="loca-setting">

            </div>
        </div>
    }
}