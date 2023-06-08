import axios from "axios";

export const getComments = async ({ queryKey, pageParam = 0 }: any) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `http://localhost:5000/api/comments?postId=${queryKey[1]}&page=${pageParam}`,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.get(
    `https://api.productaffair.com/api/comments?postId=${queryKey[1]}&page=${pageParam}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const postComment = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.post(
      `http://localhost:5000/api/comments`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.post(
    `https://api.productaffair.com/api/comments`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const likeComment = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.post(
      `http://localhost:5000/api/comments/like`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.post(
    `https://api.productaffair.com/api/comments/like`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const unlikeComment = async (data: any) => {
  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.post(
      `http://localhost:5000/api/comments/unlike`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.post(
    `https://api.productaffair.com/api/comments/unlike`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};

export const deleteComment = async (data: any) => {
  // data === commentId
  if (process.env.NODE_ENV === "development") {
    const res: any = await axios.post(
      `http://localhost:5000/api/comments/delete`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  }
  const res: any = await axios.post(
    `https://api.productaffair.com/api/comments/delete`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
};
