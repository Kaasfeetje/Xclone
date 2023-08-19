import React from "react";
import { api } from "~/utils/api";
import Post from "../Post";

type Props = {};

const FollowingContainer = (props: Props) => {
  const { data } = api.post.fetchFollowing.useQuery();

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

export default FollowingContainer;
