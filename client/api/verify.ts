import axios from "axios";

export const getVerify = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`http://localhost:5000/api/verify`, {
      withCredentials: true,
    });
    // data: { verified: false, type: 'local' }
    return res.data.data;
  }
  const res = await axios.get("https://api.productaffair.com/api/verify");

  // data: { verified: false, type: 'local' }
  return res.data.data;
};

export const getNewCode = async () => {
    if (process.env.NODE_ENV === "development") {
      const res = await axios.get(`http://localhost:5000/api/verify/resend`, {
        withCredentials: true,
      });
      // data: { verified: false, type: 'local' }
      return res.data.data;
    }
    const res = await axios.get("https://api.productaffair.com/api/verify/resend");

    // data: { verified: false, type: 'local' }
    return res.data.data;
}

export const postVerify = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(`http://localhost:5000/api/verify`, data, {
      withCredentials: true,
    });
    return res.data.data;
  }
  const res = await axios.post(
    "https://api.productaffair.com/api/verify",
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
