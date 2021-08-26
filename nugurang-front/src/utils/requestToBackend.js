import graphQlClient from "./graphQlClient";

export async function queryToBackend ({ context = null, query, variables = {} }) {
  return await graphQlClient.query({
    query,
    variables,
    context: context ? {
      headers: {
        Cookie: context.req.headers.cookie
      }
    } : null,
  }).catch(error => {
    return {
      error,
    }
  });
};

export async function mutateToBackend ({ context = null, mutation, variables = {} }) {
  return await graphQlClient.mutate({
    mutation,
    variables,
    context: context ? {
      headers: {
        Cookie: context.req.headers.cookie
      }
    } : null,
  }).catch(error => {
    return {
      error,
    }
  });
};
