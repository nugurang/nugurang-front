import { gql } from '@apollo/client';

export class GetAllPositionsQueryBuilder {

  build() {
    return gql`
      query Positions {
        positions {
          id
          name
          description
          image {
            id
            address
          }
        }
      }
    `;
  }

}

export class GetAllProgressesQueryBuilder {

  build() {
    return gql`
      query Progresses {
        progresses {
          id
          name
        }
      }
    `;
  }

}

export class GetAllMatchTypesQueryBuilder {

  build() {
    return gql`
      query MatchTypes {
        matchTypes {
          id
          name
        }
      }
    `;
  }

}

export class GetAllMatchTypesByNameQueryBuilder {

  build() {
    return gql`
      query GetMatchTypeByName($name: String!) {
        getMatchTypeByName(name: $name) {
          id
          name
        }
      }
    `;
  }

}

export class GetAllVoteTypesQueryBuilder {

  build() {
    return gql`
      query VoteTypes {
        voteTypes {
          id
          name
        }
      }
    `;
  }

}

export class GetAllVoteTypesByNameQueryBuilder {

  build() {
    return gql`
      query GetVoteTypeByName($name: String!){
        getVoteTypeByName(name: $name) {
          id
        }
      }
    `;
  }

}
