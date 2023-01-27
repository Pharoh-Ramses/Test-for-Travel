import React from 'react'
import {server} from '../../lib/api'
import {ListingsData, DeleteListingData, DeleteListingVariables} from './types'
 
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

const DELETE_LISTING = `
mutation DeleteListing($id: ID!){
  deleteListing(id: $id){
    id
  }
}

`;

interface Props {
  title: string
}

export const Listings = ({title}:Props) => {
  const fetchListings = async () => {
    try {
      const {data} = await server.fetch<ListingsData>({query: LISTINGS});
      console.log(data);
    } catch (error) {
      throw new Error('Failed to fetch listings');
    }
  };
  const deleteListing = async () => {
    try {
      const {data} = await server.fetch<DeleteListingData, DeleteListingVariables>({query: DELETE_LISTING, variables: {id: '637d4ab8cc0ef32e63e32b2f'}});
      console.log(data);
    } catch (error) {
      throw new Error('Failed to delete listing');
    }
  };
  return (
    <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>Query Listings!</button>
    <button onClick={deleteListing}>Delete a Listing!</button>
    </div>
  )
};