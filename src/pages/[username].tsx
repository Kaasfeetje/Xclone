import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const username = router.query.username as string;
  const { data } = api.user.profile.useQuery(
    { username },
    {
      enabled: username !== undefined,
    }
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/signin?redirect=/");
    return <p>Access Denied</p>;
  }

  if (!session?.user.isRegistered) {
    router.push("/register?redirect=/");
  }

  if (!data) {
    //TODO: handle error
    return <div>loading...</div>;
  }
  return (
    <div>
      @{data.username}
      <img
        src={data.profilePicture!}
        alt={`${data.username}'s profile picture`}
      />
    </div>
  );
};

export default Profile;
