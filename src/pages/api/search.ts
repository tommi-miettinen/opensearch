import { NextApiHandler } from "next";
import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = await axios.post("https://localhost:9200/users/_search", req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from("admin:admin").toString("base64")}`,
      },

      httpsAgent: agent,
    });

    return res.send(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch from OpenSearch." });
  }
};

export default handler;
