import axios from "axios";

export const getProfileDetails = async ({ queryKey }: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `http://localhost:5000/api/profileinfo?user=${queryKey[1]}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res = await axios.get(
    `https://api.productaffair.com/api/profileinfo?user=${queryKey[1]}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const getProfilePosts = async ({ queryKey, pageParam = 0 }: any) => {
  // querykey === username

  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `http://localhost:5000/api/profile?user=${queryKey[1]}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res = await axios.get(
    `https://api.productaffair.com/api/profile?user=${queryKey[1]}&page=${pageParam}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const postProfileInfo = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.post(
      `http://localhost:5000/api/profileinfo?user=${data.userId}`,
      data.formData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
  const res = await axios.post(
    `https://api.productaffair.com/api/profileinfo?user=${data.userId}`,
    data.formData,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
