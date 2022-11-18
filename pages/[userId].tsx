import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { getUserById } from "../helpers/api";

const UserProfilePage = () => {
  return (
    <div className="h-screen z-20">
      <h1>profile user</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res } = context;
  //cache data
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=180'
  )
  const session = await getSession({ req: context.req });
  const { userId } = params as { userId: string };

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: `/people/${userId}`,
      },
    };
  }

  const response = await getUserById(userId);
  const userInfoJson = await response.json();

  delete userInfoJson.password;
  return {
    props: {
      metadata: {
        user: session?.user,
      },
    },
  };
};

export default UserProfilePage;
