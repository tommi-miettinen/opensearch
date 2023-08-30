import axios from "axios";

const fetchUsers = async (query: string, ageRange: [number, number]) => {
  try {
    const searchData = {
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${query}*`,
              },
            },
            {
              range: {
                age: {
                  gte: ageRange[0],
                  lte: ageRange[1],
                },
              },
            },
          ],
        },
      },
      size: 5,
    };

    const result = await axios.post("/api/search", searchData);

    return result.data.hits.hits;
  } catch (err) {
    console.log(err);
  }
};

export default {
  fetchUsers,
};
