import axios from "axios";

export const getCategoryPosts = async ({ queryKey, pageParam = 0 }: any) => {

  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.get(
      `http://localhost:5000/api/category?category=${queryKey[1]}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
    const res: any = await axios.get(
      `https://api.productaffair.com/api/category?category=${queryKey[1]}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
  return res.data.data;
};
