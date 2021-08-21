import { gql } from '@apollo/client';

const FRAGMENT_USER = `
  fragment user on Thread {
    user {
      id
      name
      image {
        id
        address
      }
    }
  }
`;
const FRAGMENT_EVENT = `
  fragment event on Thread {
    event {
      id
      name
      description
      recruitingStart
      recruitingEnd
      eventStart
      eventEnd
      matchRequests {
        id
      }
    }
  }
`;
const FRAGMENT_FIRST_ARTICLE = `
  fragment firstArticle on Thread {
    firstArticle {
      id
      content
      viewCount
      createdAt
      modifiedAt
      title
      user {
        id
        name
        image {
          id
          address
        }
      }
      images {
        id
        address
      }
      upCount
      downCount
      starCount
    }
  }
`;
const FRAGMENT_ARTICLES = `
  fragment articles on Thread {
    getArticles(page: 0, pageSize: 100) {
      id
      user {
        id
        name
        image {
          id
          address
        }
      }
      title
      content
      viewCount
    }
  }
`;

export class GetThreadQueryBuilder {

  constructor() {
    this.user = false;
    this.event = false;
    this.firstArticle = false;
    this.articles = false;
  }

  withUser() {
    this.user = true;
    return this;
  }

  withEvent() {
    this.event = true;
    return this;
  }

  withFirstArticle() {
    this.firstArticle = true;
    return this;
  }

  withArticles() {
    this.articles = true;
    return this;
  }

  build() {
    return gql`
      query GetThread($id: ID!) {
        getThread(id: $id) {
          id
          name
          ${this.user ? '...user' : ''}
          ${this.event ? '...event' : ''}
          ${this.firstArticle ? '...firstArticle' : ''}
          ${this.articles ? '...articles' : ''}
        }
      }
      ${this.user ? FRAGMENT_USER : ''}
      ${this.event ? FRAGMENT_EVENT : ''}
      ${this.firstArticle ? FRAGMENT_FIRST_ARTICLE : ''}
      ${this.articles ? FRAGMENT_ARTICLES : ''}
    `;
  }

}

export class GetThreadsByBoardNamesQueryBuilder {

  constructor() {
    this.user = false;
    this.event = false;
    this.firstArticle = false;
    this.articles = false;
  }

  withUser() {
    this.user = true;
    return this;
  }

  withEvent() {
    this.event = true;
    return this;
  }

  withFirstArticle() {
    this.firstArticle = true;
    return this;
  }

  withArticles() {
    this.articles = true;
    return this;
  }

  build() {
    return gql`
      query GetThreadsByBoardNames($boardNames: [String]!) {
        getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
          id
          name
          ${this.user ? '...user' : ''}
          ${this.event ? '...event' : ''}
          ${this.firstArticle ? '...firstArticle' : ''}
          ${this.articles ? '...articles' : ''}
        }
      }
      ${FRAGMENT_USER}
      ${FRAGMENT_EVENT}
      ${FRAGMENT_FIRST_ARTICLE}
      ${FRAGMENT_ARTICLES}
    `;
  }

}

export class GetHotThreadsByBoardNamesQueryBuilder {

  constructor() {
    this.user = false;
    this.event = false;
    this.firstArticle = false;
    this.articles = false;
  }

  withUser() {
    this.user = true;
    return this;
  }

  withEvent() {
    this.event = true;
    return this;
  }

  withFirstArticle() {
    this.firstArticle = true;
    return this;
  }

  withArticles() {
    this.articles = true;
    return this;
  }

  build() {
    return gql`
      query GetHotThreadsByBoardNames($boardNames: [String]!) {
        getHotThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
          id
          name
          ${this.user ? '...user' : ''}
          ${this.event ? '...event' : ''}
          ${this.firstArticle ? '...firstArticle' : ''}
          ${this.articles ? '...articles' : ''}
        }
      }
      ${FRAGMENT_USER}
      ${FRAGMENT_EVENT}
      ${FRAGMENT_FIRST_ARTICLE}
      ${FRAGMENT_ARTICLES}
    `;
  }

}

export class CreateThreadMutationBuilder {

  build() {
    return gql`
      mutation CreateThread($board: ID!, $thread: ThreadInput!) {
        createThread(board: $board, thread: $thread) {
          id
          name
          firstArticle {
            id
          }
        }
      }
    `;
  }

}

export class UpdateThreadMutationBuilder {

  build() {
    return gql`
      mutation updateThread($id: ID!, $thread: ThreadInput!) {
        updateThread (id: $id, thread: $thread) {
          id
        }
      }
    `;
  }

}
