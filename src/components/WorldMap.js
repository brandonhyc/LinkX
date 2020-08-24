import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule,
    Marker,
    Sphere,
} from "react-simple-maps";
import { Spin } from 'antd';

import { geoUrl } from '../constant'

import React, { Component } from 'react';

const markers = [
    { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 25, name: "Bogota", coordinates: [-74.0721, 4.711] },
    { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];
  
export default class WorldMap extends Component {
    constructor(){
        super();
        this.state = {
            map: null,
            trackMarkers: [], 
        }
        this.refMap = React.createRef();
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: '60vw' }}>
                {
                    (this.state.loadingMap || this.props.loading) ?
                    <Spin tip="Loading..." /> : 
                    <></>
                }
                <ComposableMap projectionConfig={{ scale: 147 }}>
                    <Sphere fill="#C5D8EF" strokeWidth={1} />
                    <Geographies geography={ geoUrl }>
                    {({ geographies }) =>
                        geographies.map(geo => <Geography fill='white' stroke="#369EE3" key={geo.rsmKey} geography={geo} />)
                    }
                    </Geographies>
                    { markers.map(({ name, coordinates, markerOffset }) => (
                        <Marker key={name} coordinates={coordinates}>
                            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                            <text textAnchor="middle" y={markerOffset} style={{ fill: "#5D5A6D" }}>
                                {name}
                            </text>
                        </Marker>
                    ))}
                    <Graticule stroke="#FFFFFF" />
                </ComposableMap>
            </div>
        );
    }
}