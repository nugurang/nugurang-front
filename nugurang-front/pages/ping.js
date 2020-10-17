import { gql, useQuery } from '@apollo/client';

export default function Boards() {
  /*
  const [ping, setPing] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await client.query({query})
        setPing(res.data.ping)
      } catch (err) {
        alert(`error: ${err}`);
      }
    })();
  });

  return <h1>Hello {ping}!</h1>; */
  const { loading, error, data } = useQuery(gql`
    query  {
      ping
    }
  `);
  if (loading)
    return (<p>Loading...</p>);
  if (error) {
    console.log(error);
    return (<p>Error :(</p>);
  }
  return <h1>{data.ping}</h1>;
}
