import React from 'react';
import { Select } from '@looker/components';
import styled from 'styled-components'

export function TurtleDropdown({all_turtles, selected_turtle, setSelectedTurtle}) {
  const options = all_turtles.map((turtle,i)=>{
      return {value: String(i), label: turtle.label}
  })
  return (
    <StyledSelect
      onChange={(value)=>{setSelectedTurtle(value)}}
      options={options}
      value={selected_turtle}
    />
  );
}

const StyledSelect = styled(Select)`
position: fixed;
top: 5px;
width: 300px;
right: 25px;
`