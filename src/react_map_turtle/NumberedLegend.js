import React from 'react';
import { Flex, FlexItem } from '@looker/components';
import styled from 'styled-components'
import { localeFormatter } from './helpers';

export function NumberedLegend({ colors, data_bounds }) {

  return (
    <StyledFlex1
      flexDirection="column"
      id="kewl"
    >
      <FlexItem>
        <Flex
          justifyContent="space-between"
        >
          <FlexItem>{localeFormatter(data_bounds.min, 'en-US', 'decimal', 4)}</FlexItem>
          <FlexItem>{localeFormatter(data_bounds.max, 'en-US', 'decimal', 4)}</FlexItem>
        </Flex>
      </FlexItem>
      <FlexItem>
        <StyledFlex2
          color1={[colors[0].red,colors[0].green,colors[0].blue]}
          color2={[colors[1].red,colors[1].green,colors[1].blue]}
        ></StyledFlex2>
      </FlexItem>
    </StyledFlex1>
  );
}

const StyledFlex1 = styled(Flex)`
  position: fixed;
  bottom: 35px;
  left: 5px;
`

const StyledFlex2 = styled(Flex)`
  width: 25vw;
  height: 25px;
  background-image: linear-gradient(to right, rgb(${(props) => { return props.color1.join(',') }}), rgb(${(props) => { return props.color2.join(',') }}) );
`
