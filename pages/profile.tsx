import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { getUserById } from '../helpers/api';

const ProfilePage = () => {
    const {data: session} = useSession();
    const router = useRouter();
   
    return (
        <div>
            {session?.user?.email}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        props: {},
        redirect: {
          destination: `/login`,
        },
      };
    }
  
    return {
        props: {
            session,
        }
    }
  };
  
export default ProfilePage;