import React, {useState, useEffect} from 'react'
import ReactMapGL, {Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {bounds, colorGradient, rangeFraction} from './helpers'
import { NumberedLegend } from './NumberedLegend';
import { HoverEntry } from './HoverEntry';
import { TurtleDropdown } from './TurtleDropdown';
import { ZoomLevels } from './ZoomLevels';

const FIELD_TARGET = 'ZCTA5CE10'

// Create (or import) our react component
export default function Map ({data, height, width, query_response, colors, all_turtles, ...props}) {
  const [hover, setHover] = useState();
  const [hovered_position, setHoveredPosition] = useState();
  const [selected_turtle, setSelectedTurtle] = useState('0');
  const [viewport, setViewport] = useState({
    latitude: 37.3911,
    longitude: -96.6227,
    zoom: 3.5
  });

  useEffect(()=>{
    setViewport({...viewport, height: height+40, width})
  },[height, width])

  let first_turtle_data, first_turtle;
  let map_data;
  let data_bounds;
  let key;
  let expression = ['match', ['get', FIELD_TARGET]];

  if (all_turtles) {
    first_turtle = all_turtles[Number(selected_turtle)]
    key = first_turtle.turtle_dimension.tags[0]
  }
  
  if (first_turtle) {
    first_turtle_data = data[0][first_turtle.name]
  }

  if (first_turtle_data) {
    
    map_data = first_turtle_data._parsed.values;
    data_bounds = bounds(map_data);
    first_turtle_data._parsed.keys.forEach((key, i)=>{
      const split_zip = (key) ? key.split('::')[0] : ''
      const value = first_turtle_data._parsed.values[i]
      expression.push(split_zip, colorGradient(rangeFraction(data_bounds, value), colors[0], colors[1], colors[2]  ))
    })
  }
  expression.push(colorGradient(0, colors[0], colors[1], colors[2] ));

  const dataLayer = {
    id: 'zips',
    'source-layer': 'tl_2019_us_zcta510_no_keys',
    type: 'fill',
    property: 'percentile',
    source: 'zips',
    paint: {
      'fill-color': expression,
      'fill-opacity': 0.8
    }
  }


  const handleHover = (event) => {
    const {features, center } = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'zips');
      setHover(hoveredFeature?.properties[FIELD_TARGET]); 
      setHoveredPosition(center)
  }
  
  return  <>
  <ReactMapGL
    mapboxApiAccessToken={key}
    {...viewport}
    onViewportChange={setViewport}
    onHover={handleHover}
  >
    <ZoomLevels {...{viewport,setViewport}} />
    <Source id="zips" type="vector" url="mapbox://bryan-at-looker.46oczy87">
      <Layer {...dataLayer} />
    </Source>
  </ReactMapGL>
  { data_bounds && <NumberedLegend
      colors={colors}
      data_bounds={data_bounds}
    /> }
  {first_turtle_data && hover && <HoverEntry 
    {...{hover, hovered_position, data_bounds, colors}} 
    keys={first_turtle_data?._parsed?.keys} 
    values={first_turtle_data?._parsed?.values}
  /> }
  { all_turtles && (all_turtles.length > 1) && <TurtleDropdown 
    {...{all_turtles, selected_turtle, setSelectedTurtle}}
  /> }
  </>
}
