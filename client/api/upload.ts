import axios from "axios";

export const getUpload = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/upload`, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.get("https://api.productaffair.com/api/upload", {
    withCredentials: true,
  });
  return res.data.data;
};

export const postUpload = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/upload`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.post(
    "https://api.productaffair.com/api/upload",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
