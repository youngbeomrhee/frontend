import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import {nanoid} from 'nanoid';

const Star = ({selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect}/>
);

const createArray = length => [...Array(length)];

export default function StarRating({style= {}, totalStars = 5, selectedStarsCount = 0, ...props }) {
  let [selectedStars, setSelectedStars] = useState(selectedStarsCount);
  return (
    <div style={{ padding: '5px', ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={`${nanoid()}-${i}`}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </div>
  )
}