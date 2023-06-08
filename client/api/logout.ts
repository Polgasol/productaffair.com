import axios from "axios";

export const logout = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/logout`, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.get("https://api.productaffair.com/api/logout", {
    withCredentials: true,
  });
  return res.data.data;
};
