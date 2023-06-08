import axios from "axios";

export const likePost = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/like`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.post("https://api.productaffair.com/api/like", data, {
    withCredentials: true,
  });
  return res.data.data;
};

export const unlikePost = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/unlike`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.post(
    "https://api.productaffair.com/api/unlike",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
