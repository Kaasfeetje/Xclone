import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";

type Props = {};

const RegistrationForm = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { update } = useSession();

  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const registrationMutation = api.user.register.useMutation({
    onSuccess: async () => {
      await update();
      router.push(redirect ?? "/");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registrationMutation.mutate({
      username,
      profilePicture,
    });
    //TODO: handle errors
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@username"
        />
        <input
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          placeholder="image url(for now)"
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
