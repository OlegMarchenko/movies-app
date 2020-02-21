import React from 'react';

export const preparationData = (item) => (
  item.map(({ id, name }) => {
    return <span key={id}>{name}</span>;
  })
);

export const preparationTime = (item) => (
  item.map(({ id, time_interval, start_free_hours, end_free_hours }) => {
    return <span key={id}>{time_interval} ({start_free_hours} - {end_free_hours})</span>;
  })
);