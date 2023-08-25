import { useRef } from "react";
import Head from "next/head";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MainPageHeader from "~/components/Main/MainPageHeader";
import ForYouContainer from "~/components/Main/Containers/ForYouContainer";
import FollowingContainer from "~/components/Main/Containers/FollowingContainer";
import Sidebar from "~/components/Sidebar/Sidebar";
import PostForm from "~/components/Main/PostForm/PostForm";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const ref = useRef<HTMLDivElement>(null);

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
          <MainPageHeader containerRef={ref}>
            <ForYouContainer />
            <FollowingContainer />
          </MainPageHeader>
          <div ref={ref} className="mt-4 h-[500vh]">
            <PostForm />
            {/* this is where for you and following are portalled */}
          </div>
        </div>
        <Sidebar />
      </Layout>
    </>
  );
}
