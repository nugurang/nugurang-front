import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { mutateToBackend } from '@/src/utils/backend';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('session', async (context: any, props: any) => {
  const callbackUrl = context.query.callbackUrl ?? '/';
  const session = await getSession(context);

  if (session &&
      session.hasOwnProperty('user') &&
      session.user!.hasOwnProperty('name') &&
      session.user!.hasOwnProperty('email')
  ) {

    let imageId;
    if (session.user!.image) {
      const createImageResponse = await mutateToBackend(context, `
        mutation CreateImage($address: String!) {
          createImage (address: $address) {
            id
            address
          }
        }
      `, {
        address: session.user!.image
      });
      imageId = createImageResponse.data.createImage.id;
    }
    const createCurrentUserResponse = await mutateToBackend(context, `
      mutation CreateCurrentUser($user: UserInput!) {
        createCurrentUser (user: $user) {
          id
        }
      }
    `, {
      user: {
        name: session.user!.name,
        email: session.user!.email,
        biography: '',
        image: imageId,
      }
    }) as any;
    if (createCurrentUserResponse.hasOwnProperty('error')) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?callbackUrl=${callbackUrl}`,
        },
        props:{
          callbackUrl
        },
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: callbackUrl,
      },
      props:{},
    };
    
  } else {
    return {
      notFound: true,
    };
  }

});

const Register: NextPage = () => {
  return (<></>);
}

export default Register;
