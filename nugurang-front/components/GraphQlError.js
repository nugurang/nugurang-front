import { useRouter } from 'next/router';
import Layout from './Layout';

export default function GraphQlError({error}) {
  const router = useRouter();
  if (error.networkError?.statusCode === 403) {
    router.push('/signin');
    return <Layout><p>Signin required</p></Layout>;
  }
  return <Layout><p>{error.message}</p></Layout>;
}
