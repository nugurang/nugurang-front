import { gql } from '@apollo/client';

const FRAGMENT_THREADS = `
  fragment threads on Board {
    getThreads(page: 0, pageSize: 5) {
      id
      name
      user {
        name
        image {
          address
        }
      }
      firstArticle {
        id
        title
        content
        createdAt
        modifiedAt
        images {
          address
        }
        viewCount
        upCount
        downCount
        starCount
      }
    }
  }
`;

export class GetBoardQueryBuilder {

  constructor() {
    this.threads = false;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  build() {
    return gql`
      query GetBoard($id: ID!) {
        getBoard(id: $id) {
          id
          name
          ${this.threads ? '...threads' : ''}
        }
      }
      ${this.threads ? FRAGMENT_THREADS : ''}
    `;
  }

}

export class GetBoardByNameQueryBuilder {

  constructor() {
    this.threads = false;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  build() {
    return gql`
      query getBoardByName($name: String!) {
        getBoardByName(name: $name) {
          id
          name
          ${this.threads ? '...threads' : ''}
        }
      }
      ${this.threads ? FRAGMENT_THREADS : ''}
    `;
  }

}

export class GetBoardsByNamesQueryBuilder {

  constructor() {
    this.threads = false;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  build() {
    return gql`
      query GetBoardsByNames($names: [String]!) {
        getBoardsByNames(names: $names) {
          id
          name
          ${this.threads ? '...threads' : ''}
        }
      }
      ${this.threads ? FRAGMENT_THREADS : ''}
    `;
  }

}

export class CreateBoardMutationBuilder {

  build() {
    return gql`
      mutation CreateBoard($board: BoardInput!) {
        createBoard(board: $board) {
          id
          name
        }
      }
    `;
  }

}
