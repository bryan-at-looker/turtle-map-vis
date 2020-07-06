import {filter} from 'lodash'


export function zipTurtle(queryResponse) {
  if (queryResponse && queryResponse.fields && queryResponse.fields.measure_like) {
    const turtles = filter(queryResponse.fields.measure_like, function (o) { 
      return o.is_turtle && o.turtle_dimension && o.turtle_dimension.tags.length === 1;
    })
    if (turtles && turtles.length) {
      return turtles
    } else {
      return undefined
    }     
  } else {
    return undefined
  }
}

export function bounds(data) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min
  return { min, max, range }
}

export function valueToColor(value, data_bounds, colors) {
  const range_fraction = rangeFraction(data_bounds, value)
  return colorGradient(range_fraction, colors[0], colors[1])
  
}

export function rangeFraction(bounds, value) {
  return (value - bounds.min) / bounds.range;
}

export function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
  if (!fadeFraction) {
    return 'transparent'
  }
  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}

export function localeFormatter(number, locale, type, digits) {
  return number.toLocaleString(
    locale,
    {
      style: type,
      minimumFractionDigits: digits
    }
  )
}

export function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16)
	} : null;
}