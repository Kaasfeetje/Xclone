import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const signin = (props: Props) => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <div>
      <div>
        <button
          onClick={() => signIn(undefined, { callbackUrl: redirect ?? "/" })}
        >
          Sign in.
        </button>
      </div>
    </div>
  );
};

export default signin;
