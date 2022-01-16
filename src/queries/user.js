import { gql } from '@apollo/client';

const FRAGMENT_NOTIFICATIONS = `
  fragment notifications on User {
    getNotifications(page: 0, pageSize: 100) {
      id
      isRead
      createdAt
      data
      type {
        id
        name
      }
      user {
        id
        name
        image {
          id
          address
        }
      }
    }
  }
`;
const FRAGMENT_FOLLOWS = `
  fragment follows on User {
    getFollowings(page: 0, pageSize: 100) {
      id
      name
      image{
        id
        address
      }
      email
      biography
    }
    getFollowers(page: 0, pageSize: 100) {
      id
      name
      image{
        id
        address
      }
      email
      biography
    }
  }
`;
const FRAGMENT_HONORS = `
  fragment honors on User {
    honors {
      id
      honor
      position {
        id
        name
        description
        image {
          id
          address
        }
      }
    }
  }
`;
const FRAGMENT_THREADS = `
  fragment threads on User {
    getThreads(page: 0, pageSize: 3) {
      id
      name
      user {
        name
        image {
          id
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
const FRAGMENT_TEAMS = `
  fragment teams on User {
    getTeams(page: 0, pageSize: 100) {
      id
      name
      owner {
        id
        image {
          id
          address
        }
      }
      getMembers(page: 0, pageSize: 100) {
        id
        image {
          id
          address
        }
      }
    }
  }
`;
const FRAGMENT_EVALUATIONS = `
  fragment evaluations on User {
    getUserEvaluations(page: 0, pageSize: 100) {
      id
      createdAt
      expiredAt
      project {
        id
      }
      reviews {
        id
      }
    }
  }
`;
const FRAGMENT_BLOG = `
  fragment blog on User {
    blog {
      id
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
            id
            address
          }
          viewCount
          upCount
          downCount
          starCount
        }
      }
    }
  }
`;

export class GetUserQueryBuilder {

  constructor() {
    this.follows = false;
    this.honors = false;
    this.threads = false;
    this.teams = false;
    this.evaluations = false;
    this.blog = false;
  }

  withFollows() {
    this.follows = true;
    return this;
  }

  withHonors() {
    this.honors = true;
    return this;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  withTeams() {
    this.teams = true;
    return this;
  }

  withEvaluations() {
    this.evaluations = true;
    return this;
  }

  withBlog() {
    this.blog = true;
    return this;
  }

  build() {
    return gql`
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          name
          email
          totalHonor
          image {
            id
            address
          }
          biography
          ${this.follows ? '...follows' : ''}
          ${this.honors ? '...honors' : ''}
          ${this.threads ? '...threads' : ''}
          ${this.teams ? '...teams' : ''}
          ${this.evaluations ? '...evaluations' : ''}
          ${this.blog ? '...blog' : ''}
        }
      }
      ${this.follows ? FRAGMENT_FOLLOWS : ''}
      ${this.honors ? FRAGMENT_HONORS : ''}
      ${this.threads ? FRAGMENT_THREADS : ''}
      ${this.teams ? FRAGMENT_TEAMS : ''}
      ${this.evaluations ? FRAGMENT_EVALUATIONS : ''}
      ${this.blog ? FRAGMENT_BLOG : ''}
    `;
  }

}

export class GetUsersByNameQueryBuilder {

  constructor() {
    this.follows = false;
    this.honors = false;
    this.threads = false;
    this.teams = false;
    this.evaluations = false;
    this.blog = false;
  }

  withFollows() {
    this.follows = true;
    return this;
  }

  withHonors() {
    this.honors = true;
    return this;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  withTeams() {
    this.teams = true;
    return this;
  }

  withEvaluations() {
    this.evaluations = true;
    return this;
  }

  withBlog() {
    this.blog = true;
    return this;
  }

  build() {
    return gql`
      query GetUsersByName($name: String!) {
        getUsersByName(name: $name, page: 0, pageSize: 100) {
          id
          name
          email
          totalHonor
          image {
            id
            address
          }
          biography
          ${this.follows ? '...follows' : ''}
          ${this.honors ? '...honors' : ''}
          ${this.threads ? '...threads' : ''}
          ${this.teams ? '...teams' : ''}
          ${this.evaluations ? '...evaluations' : ''}
          ${this.blog ? '...blog' : ''}
        }
      }
      ${this.follows ? FRAGMENT_FOLLOWS : ''}
      ${this.honors ? FRAGMENT_HONORS : ''}
      ${this.threads ? FRAGMENT_THREADS : ''}
      ${this.teams ? FRAGMENT_TEAMS : ''}
      ${this.evaluations ? FRAGMENT_EVALUATIONS : ''}
      ${this.blog ? FRAGMENT_BLOG : ''}
    `;
  }

}

export class GetCurrentUserQueryBuilder {

  constructor() {
    this.notifications = false;
    this.follows = false;
    this.honors = false;
    this.threads = false;
    this.teams = false;
    this.evaluations = false;
    this.blog = false;
  }

  withNotifications() {
    this.notifications = true;
    return this;
  }

  withFollows() {
    this.follows = true;
    return this;
  }

  withHonors() {
    this.honors = true;
    return this;
  }

  withThreads() {
    this.threads = true;
    return this;
  }

  withTeams() {
    this.teams = true;
    return this;
  }

  withEvaluations() {
    this.evaluations = true;
    return this;
  }

  withBlog() {
    this.blog = true;
    return this;
  }

  build() {
    return gql`
      query CurrentUser {
        currentUser {
          id
          oauth2Provider
          oauth2Id
          name
          email
          image {
            id
            address
          }
          biography
          ${this.notifications ? '...notifications' : ''}
          ${this.follows ? '...follows' : ''}
          ${this.honors ? '...honors' : ''}
          ${this.threads ? '...threads' : ''}
          ${this.teams ? '...teams' : ''}
          ${this.evaluations ? '...evaluations' : ''}
          ${this.blog ? '...blog' : ''}
        }
      }
      ${this.notifications ? FRAGMENT_NOTIFICATIONS : ''}
      ${this.follows ? FRAGMENT_FOLLOWS : ''}
      ${this.honors ? FRAGMENT_HONORS : ''}
      ${this.threads ? FRAGMENT_THREADS : ''}
      ${this.teams ? FRAGMENT_TEAMS : ''}
      ${this.evaluations ? FRAGMENT_EVALUATIONS : ''}
      ${this.blog ? FRAGMENT_BLOG : ''}
    `;
  }

}

export class GetCurrentOAuth2UserQueryBuilder {

  build() {
    return gql`
      query CurrentOAuth2User {
        currentOAuth2User {
          id
          name
          email
        }
      }
    `;
  }

}

export class CreateUserMutationBuilder {

  build() {
    return gql`
      mutation CreateUser($user: UserInput!) {
        createCurrentUser (user: $user) {
          id
        }
      }
    `;
  }

}

export class CreateUserFollowingMutationBuilder {

  build() {
    return gql`
      mutation createFollowing($user: ID!) {
        createFollowing(user: $user)
      }
    `;
  }

}

export class UpdateUserMutationBuilder {

  build() {
    return gql`
      mutation UpdateUser($user: UserInput!) {
        updateCurrentUser (user: $user) {
          id
        }
      }
    `;
  }

}

export class UpdateUserReviewsMutationBuilder {

  build() {
    return gql`
      mutation UpdateUserReviews($evaluation: ID!, $reviews: [UserReviewInput]!) {
        updateUserReviews (evaluation: $evaluation, reviews: $reviews)
      }
    `;
  }

}
