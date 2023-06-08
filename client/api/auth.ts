import axios from "axios";

export const userAuth = async () => {
  // "http:localhost:5000/api"

  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.get("http://localhost:5000/api", {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res: any = await axios.get("https://api.productaffair.com/api", {
    withCredentials: true,
  });
  return res.data.data;
};
