import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const daysList = props.days.map(day => {
    return (
    <ul>
      <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    </ul>
    )
    });
  
    return <ul>{daysList}</ul>;
  
}