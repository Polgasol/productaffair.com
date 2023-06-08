import React from "react";
import { useRouter } from "next/router";
import PostTemplate from "../../components/templates/post-template/PostTemplate";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/post";

const Post = () => {
  return <PostTemplate />;
};

export default Post;
