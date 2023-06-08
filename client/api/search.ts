import axios from "axios";

export const getSearch = async ({ queryKey, pageParam = 0 }: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `http://localhost:5000/api/search?query=${queryKey[1]}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.get(
    `https://api.productaffair.com/api/search?query=${queryKey[1]}&page=${pageParam}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
