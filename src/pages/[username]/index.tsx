import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar/Navbar";
import { api } from "~/utils/api";
import Tabs from "~/components/common/Tabs/Tabs";
import Profile from "~/components/User/Profile";
import Sidebar from "~/components/Sidebar/Sidebar";
import Header from "~/components/common/Header";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const username = router.query.username as string;
  const { data } = api.user.profile.useQuery(
    { username },
    {
      enabled: username !== undefined,
    }
  );

  const ref = useRef<HTMLDivElement>(null);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push(`/signin?redirect=${router.asPath}`);
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
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <div className="bg-white ">
          <Header>
            <div className="flex flex-col">
              <span className="text-xl font-bold">{data.name}</span>
              <span className="-mt-1 text-gray-600">0 posts</span>
              {/* TODO: Add post count */}
            </div>
          </Header>
          <Profile user={data} session={session!} />
          <Tabs
            element={ref && ref.current}
            tabCount={4}
            tabNames={["Posts", "Replies", "Media", "Likes"]}
          >
            <div>Posts</div>
            <div>Replies</div>
            <div>Media</div>
            <div>Likes</div>
          </Tabs>
          <div ref={ref} className="mt-4 h-[500vh]">
            {/* this is where for you and following are portalled */}
          </div>
        </div>
        <Sidebar />
      </Layout>
    </>
  );
};

export default ProfilePage;
