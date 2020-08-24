import React, { useState } from "react";
import ReactGlobe from "react-globe";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { Card } from "antd";

function markerTooltipRenderer(marker) {
    return `${marker.name}`;
}

const options = {
  markerTooltipRenderer
};

export default function Globe(props) {

  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setDetails(marker);
  }

  function onDefocus(previousFocus) {
    setEvent({
      type: "DEFOCUS",
      previousFocus
    });
    setDetails(null);
  }

  return (
      
    <div>
      {details && (
          <Card title={details.name} bordered={true} style={{ 
              width: 300,
              position: "absolute",
              fontSize: 20,
              bottom: 0,
              right: 0,
              padding: 0
            }}>
            <p>{`Latitude ${details.coordinates[0]} Longitude ${details.coordinates[1]}`}</p>
        </Card>
      )}
      <ReactGlobe
        height="95vh"
        markers={props.markers}
        options={options}
        width="80vw"
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
}
