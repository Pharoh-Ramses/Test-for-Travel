import { IResolvers } from "@graphql-tools/utils";
import { Database, Listing } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      // eslint-disable-next-line @typescript-eslint/ban-types
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteRes.value) {
        throw new Error("Deletion not successful");
      }
      return deleteRes.value;
    },
  },
  Listing: {
    id: (listings: Listing): string => listings._id.toString(),
  },
};
