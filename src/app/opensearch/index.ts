import data from "./users.json";
import { Client } from "@opensearch-project/opensearch";

let host = "localhost";
let protocol = "https";
let port = 9200;
let auth = "admin:admin";

export const client = new Client({
  node: protocol + "://" + auth + "@" + host + ":" + port,

  ssl: {
    rejectUnauthorized: false,
  },
});

export const testConnection = async () => {
  try {
    const health = await client.cluster.health();
    console.log(health);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Connection Failed");
  }
};

export const createIndex = async () => {
  await client.indices.create({
    index: "users",
    body: {
      mappings: {
        properties: {
          weight: { type: "float" },
        },
      },
    },
  });
};

export const seed = async () => {
  for (const user of data.users) {
    try {
      await client.index({
        index: "users",
        body: user,
      });
    } catch (error) {
      console.error("Error indexing user:", error);
    }
  }
};
