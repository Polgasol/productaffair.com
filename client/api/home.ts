import axios from "axios";

export const homePosts = async ({ pageParam = 0 }) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `http://localhost:5000/api/pages?page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.get(
    `https://api.productaffair.com/api/pages?page=${pageParam}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
