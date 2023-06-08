import axios from "axios";

export const getPost = async (queryId: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/post/${queryId}`, {
      withCredentials: true,
    });
    return res.data;
  }
  const res = await axios.get(
    `https://api.productaffair.com/api/post/${queryId}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
