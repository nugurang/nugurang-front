import graphQlClient from "./graphQlClient";

export default async function queryServerSide ({ context, query, variables = {} }) {
  return await graphQlClient.query({
    query,
    variables,
    context: {
      headers: {
        Cookie: context.req.headers.cookie
      }
    },
  }).catch(error => {
    return {
      error,
    }
  });
};
