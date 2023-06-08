import axios from "axios";

export const getRegister = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/register`, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.get("https://api.productaffair.com/api/register", {
    withCredentials: true,
  });
  return res.data.data;
};

export const postRegister = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/register`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.post(
    "https://api.productaffair.com/api/register",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data; // data.verified
};
