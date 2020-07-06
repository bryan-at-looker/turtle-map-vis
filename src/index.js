import Map from './react_map_turtle/Map'
import React from 'react'
import ReactDOM from 'react-dom'
import {ComponentsProvider} from '@looker/components'
import { hexToRgb, zipTurtle } from './react_map_turtle/helpers'

looker.plugins.visualizations.add({
  options: {
    color1: {
      label: "Color High",
      default: "#0000FF",
      section: "Style",
      type: "string",
      display: "color"
    },
    color2: {
      label: "Color Low",
      default: "#FFFFFF",
      section: "Style",
      type: "string",
      display: "color"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .map-container {
          /* Vertical centering */
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
      </style>
    `;
    
    // Create a container element to let us center the text.
    this._vis_element = document.getElementById('vis')
    this._vis_element.style.setProperty('margin', '0')
    // let container = element.appendChild(document.createElement("div"));
    this._vis_element.className = "map-container";

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {
    
    // Clear any errors from previous updates
    this.clearErrors();

    const all_turtles = zipTurtle(queryResponse);

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (!(all_turtles && all_turtles.length)) {
      this.addError({title: "No Zipcode Turtles", message: "This chart requires at least one turtle with dimension type: zipcode and has exactly one tag with a mapbox token in it"});
      return;
    }

    if (data.length !== 1) {
      this.addError({title: "Only One Row", message: "This chart requires only one row to be returned"});
      return;
    }

    const offset_props = {
      height: this._vis_element.offsetHeight, 
      width: this._vis_element.offsetWidth
    }

    // Finally update the state with our new data
    this.chart = ReactDOM.render(
      <ComponentsProvider>
        <>
          <Map 
            colors={[hexToRgb(config.color2),hexToRgb(config.color1)]}
            data={data}
            query_response={queryResponse}
            all_turtles={all_turtles}
            {...offset_props}
          />
        </>
      </ComponentsProvider>
      , this._vis_element
    );

    // We are done rendering! Let Looker know.
    done();
  }
});