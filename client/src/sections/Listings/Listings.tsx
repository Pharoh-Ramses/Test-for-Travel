import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { TypeVariable } from "typescript";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
} from "./types";

const LISTINGS = gql`
  query Listings {
    listings {
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  //Use Query Hook
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  //Use Mutation Hook
  const [
    deleteListing,
    { loading: delteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  //Handle Delete Listing
  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };
  const listings = data ? data.listings : null;
  const listingList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later</h2>;
  }
  const deleteListingLoadingMessage = delteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;
  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Uh oh! Something went wrong with deleting - please try again later</h4>
  ) : null;
  return (
    <div>
      <h2>{title}</h2>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
