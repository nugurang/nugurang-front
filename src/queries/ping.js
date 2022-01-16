import { gql } from '@apollo/client';

export class GetPingQueryBuilder {

  build() {
    return gql`
      query  {
        ping
      }
  `;
  }

}
