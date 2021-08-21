import { gql } from '@apollo/client';

export class CreateMatchRequestMutationBuilder {

  build() {
    return gql`
      mutation CreateMatchRequest($request: MatchRequestInput!) {
        createMatchRequest (request: $request) {
          id
        }
      }
    `;
  }

}
