import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', { 
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpot = (spot) => {
    if (spot === 0) {
      return 'no spots remaining';
    } else if (spot === 1) {
      return `${spot} spot remaining`;
    } else {
      return `${spot} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpot(props.spots)}</h3>
    </li>
  );
}