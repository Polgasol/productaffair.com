import axios from "axios";

export const deletePost = async (data: any) => {

  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(
      `http://localhost:5000/api/deletepost`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
    const res = await axios.post(
      `https://api.productaffair.com/api/deletepost`,
      data,
      {
        withCredentials: true,
      }
    );
  return res.data.data;
};
