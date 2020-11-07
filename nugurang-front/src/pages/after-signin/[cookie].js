import Cookies from 'js-cookie';
import {useEffect} from 'react'
import {useRouter} from 'next/router';


export default function AfterSigninCookie() {
  const router = useRouter();
  const {cookie} = router.query;
    useEffect(() => {
      Cookies.set('JSESSIONID', cookie);
      router.replace('/')
    });
    return (<>Redirecting</>);
}
