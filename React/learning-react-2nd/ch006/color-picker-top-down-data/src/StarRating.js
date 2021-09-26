import React from 'react';
import {FaStar} from 'react-icons/fa';
import {nanoid} from 'nanoid';

const Star = ({selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect}/>
);

const createArray = length => [...Array(length)];

export default function StarRating({totalStars = 5, selectedStars = 0 }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={`${nanoid()}-${i}`}
          selected={selectedStars > i}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
}