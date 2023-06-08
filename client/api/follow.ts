import axios from "axios";

export const followUser = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/follow`, data, {
      withCredentials: true,
    });
    return res.data;
  }
  const res = await axios.post(
    "https://api.productaffair.com/api/follow",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const unFollowUser = async (data: any) => {
  const res = await axios.post(
    "https://api.productaffair.com/api/unfollow",
    data,
    {
      withCredentials: true,
    }
  );
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/unfollow`, data, {
      withCredentials: true,
    });
    return res.data;
  }
  return res.data;
};
