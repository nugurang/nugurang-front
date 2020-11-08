import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import withAuth from '../../components/withAuth';
import GraphQlError from '../../components/GraphQlError';
import Loading from '../../components/Loading';

const GET_IMAGE = gql`
  query getImage($id: ID!) {
    getImage(id: $id) {
      id
      address
    }
  }
`;

function ShowImage() {
  const router = useRouter();

  const responses = [
    useQuery(GET_IMAGE, {variables: {id: router.query.id}})
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const image = responses[0].data.getImage;

  return (
    <img src={image.address} alt="Image clicked by user" />
  );
}

export default withAuth(ShowImage);