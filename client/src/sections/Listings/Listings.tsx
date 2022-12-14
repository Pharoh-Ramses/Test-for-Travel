import React from 'react'
import {server} from '../../lib/api'
 
const LISTINGS = `
  query Listings{
    listings{
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;


interface Props {
  title: string
}

export const Listings = ({title}:Props) => {
  const fetchListings = async () => {
    try {
      const {data} = await server.fetch({query: LISTINGS});
      console.log(data);
    } catch (error) {
      throw new Error('Failed to fetch listings');
    }
  };
  return (
    <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>Query Listings!</button>
    </div>
  )
};