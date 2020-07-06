import React from 'react';
import { Box, Icon } from '@looker/components';
import styled from 'styled-components'

export function ZoomLevels({viewport, setViewport}) {
  
  return <>
    <StyledBox flexDirection="column" display="flex">
        <Icon onClickCapture={()=>{setViewport({...viewport, zoom: viewport.zoom+1})}} name="CaretUp"/>
        <Icon  onClickCapture={()=>{setViewport({...viewport, zoom: viewport.zoom-1})}} name="CaretDown"/>
    </StyledBox>
  </>
}


const StyledBox = styled(Box)`
  background-color: white;
  position: fixed;
  top: 5px;
  left: 5px;
  cursor: default;
`