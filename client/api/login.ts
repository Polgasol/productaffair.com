import axios from "axios";

export const getLogin = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/login`, { 
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.get("https://api.productaffair.com/api/login", {
    withCredentials: true,
  });
  return res.data.data;
};

export const postLogin = async (data: any) => {

  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/login`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
    const res = await axios.post(
      "https://api.productaffair.com/api/login",
      data,
      {
        withCredentials: true,
      }
    );
  return res.data.data;
};
