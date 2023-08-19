import React, { useEffect } from "react";
import { api } from "~/utils/api";
import Post from "../Post/Post";

type Props = {};

const ForYouContainer = (props: Props) => {
  const { data } = api.post.fetchForYou.useQuery();

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default ForYouContainer;
