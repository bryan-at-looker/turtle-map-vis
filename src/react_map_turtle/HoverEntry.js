import React, { useState, useEffect } from 'react';
import { Text, Flex, Icon, Grid } from '@looker/components';
import styled from 'styled-components'
import {findIndex} from 'lodash'
import { valueToColor, localeFormatter } from './helpers';

export function HoverEntry({hover, keys, values, hovered_position, data_bounds, colors}) {
  const [details, setDetails] = useState()
  useEffect(()=>{
    findHoverData();
  },[hover])

  const findHoverData = () => {
    if (hover) {
      const found = findIndex(keys, function(o) { return o?.split('::')[0] == hover } )
      if (found > -1) {
        // const block = keys[found].split('::').concat([values[found]]).join('\n')
        setDetails({
          zip: keys[found],
          value: values[found]
        })
      } else {
        setDetails(undefined)
      }
    } else {
      setDetails(undefined)
    }
  }
  
  if (details) {
    return (
      <StyledFlex
        p="xxsmall"
        flexWrap="nowrap"
        alignItems="center"
        mr="small"
        justifyContent="flex-start"
        {...hovered_position}
      >
        <Icon 
          style={{backgroundColor: 'transparent' }}
          artwork={
            <svg width="25" height="25">
              <rect 
                rx="5" 
                ry="5" 
                width="25" 
                height="25"
                style={{fill: `${valueToColor(details.value, data_bounds, colors)}`}} />
            </svg>
          }
        />
        <Grid columns={1} gap="xxxsmall">
          {(details && details.zip && details.zip.length > 0) && <Text 
            fontSize="small"
            ml="xxsmall"
          >
            {`${details.zip}`}
          </Text> }
          {(details && details.value) && <Text 
            fontSize="xsmall"
            ml="xxsmall"
          >
            {`${localeFormatter(details.value, 'en-US', 'decimal', 4)}`}
          </Text> }             
        </Grid>
      </StyledFlex>
    );
  } else {
    return <></>
  }
}

const StyledFlex = styled(Flex)`
white-space: normal;
word-wrap: break-word;
background-color: rgb(255, 255, 255, 0.5);
position: fixed;
top: calc(${props=>props.y}px + 1em);
left: calc(${props=>props.x}px + 1em);
`
