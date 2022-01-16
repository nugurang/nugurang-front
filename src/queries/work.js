import { gql } from '@apollo/client';

const FRAGMENT_TASKS = `
  fragment tasks on Work {
    tasks {
      id
      name
      difficulty
      order
      progress {
        id
        name
      }
      users {
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

export class GetWorkQueryBuilder {

  constructor() {
    this.tasks = false;
  }

  withTasks() {
    this.tasks = true;
    return this;
  }

  build() {
    return gql`
      query GetWork($id: ID!) {
        getWork(id: $id) {
          id
          project {
            id
            getUsers(page: 0, pageSize: 100) {
              id
              name
            }
          }
          name
          opened
          order
          ${this.tasks ? '...tasks' : ''}
        }
      }
      ${this.tasks ? FRAGMENT_TASKS : ''}
    `;
  }
}

export class CreateWorkMutationBuilder {

  build() {
    return gql`
      mutation CreateWork($project: ID!, $work: WorkInput!) {
        createWork(project: $project, work: $work) {
          id
          name
        }
      }
    `;
  }

}

export class UpdateWorkMutationBuilder {

  build() {
    return gql`
      mutation UpdateWork($id: ID!, $work: WorkInput!) {
        updateWork(id: $id, work: $work) {
          id
          name
        }
      }
    `;
  }

}


export class DeleteWorkMutationBuilder {

  build() {
    return gql`
      mutation DeleteWork($id: ID!) {
        deleteWork(id: $id) {
          id
        }
      }
    `;
  }

}
