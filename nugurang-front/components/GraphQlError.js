import { useRouter } from 'next/router';

export default function GraphQlError({response}) {
  const router = useRouter();
  if (response.error.networkError?.statusCode === 403) {
    router.push('/signin');
    return <p>Signin required</p>;
  }
  return <p>{response.error.message}</p>;
}
