import { Database } from "../lib/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
