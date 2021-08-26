import { useRouter } from 'next/router';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetImageQueryBuilder } from '../../queries/image';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const imageResult = await queryToBackend({
    context,
    query: new GetImageQueryBuilder().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      image: imageResult.data.getImage,
    },
  };
});

function ShowImage({ image }) {
  const router = useRouter();
  return (
    <img src={image.address} alt="Image clicked by user" />
  );
}

export default ShowImage;
