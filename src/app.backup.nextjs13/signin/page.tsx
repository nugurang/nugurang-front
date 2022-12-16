import LoginFragment from './LoginFragment';

export default async () => {
  return (
    <LoginFragment 
      isLoggedIn={false}
      username={'test'}
    />
  );
}
