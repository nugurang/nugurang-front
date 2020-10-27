import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Loading from './Loading';
import GraphQlError from './GraphQlError';

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
    }
  }
`;

export default function withAuth(Component) {
  return (props) => {
    const router = useRouter();
    const response = useQuery(GET_CURRENT_USER);
    if (response.error)
      return <GraphQlError error={response.error} />
    if (response.loading)
      return <Loading />;
    if (response.data.currentUser === null) {
      router.push('/signup');
      return <p>Signup Required</p>;
    }
    return <Component {...props} />
  }
}
