import { useRouter } from 'next/router';

export default function GraphQlError({result}) {
  const router = useRouter();
  if (result.error.networkError?.statusCode === 403) {
    router.push('/signin');
    return <p>Signin required</p>;
  }
  return <p>{result.error.message}</p>;
}
