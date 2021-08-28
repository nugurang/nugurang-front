import { gql } from '@apollo/client';

const FRAGMENT_PROGRESS = `
  fragment progress on Task {
    progress {
      id
      name
    }
  }
`;

const FRAGMENT_POSITIONS = `
  fragment positions on Task {
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

const FRAGMENT_USERS = `
  fragment users on Task {
    users {
      id
      name
      image {
        id
        address
      }
    }
  }
`;

const FRAGMENT_WORK = `
  fragment work on Task {
    work {
      id
    }
  }
`;

export class GetAllTaskPositionsQueryBuilder {

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

export class GetAllTaskProgressesQueryBuilder {

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

export class GetTaskQueryBuilder {

  constructor() {
    this.progress = false;
    this.positions = false;
    this.users = false;
    this.works = false;
  }

  withProgress() {
    this.progress = true;
    return this;
  }

  withPositions() {
    this.positions = true;
    return this;
  }

  withUsers() {
    this.users = true;
    return this;
  }

  withWork() {
    this.work = true;
    return this;
  }

  build() {
    return gql`
      query GetTask($id: ID!) {
        getTask(id: $id) {
          id
          work {
            id
          }
          name
          difficulty
          order
          ${this.progress ? '...progress' : ''}
          ${this.positions ? '...positions' : ''}
          ${this.users ? '...users' : ''}
          ${this.work ? '...work' : ''}
        }
      }
      ${this.progress ? FRAGMENT_PROGRESS : ''}
      ${this.positions ? FRAGMENT_POSITIONS : ''}
      ${this.users ? FRAGMENT_USERS : ''}
      ${this.work ? FRAGMENT_WORK : ''}
    `;
  }

}

export class CreateTaskMutationBuilder {

  build() {
    return gql`
      mutation CreateTask($work: ID!, $task: TaskInput!) {
        createTask(work: $work, task: $task) {
          id
          name
        }
      }
    `;
  }

}

export class CreateTaskPositionMutationBuilder {

  build() {
    return gql`
      mutation CreatePosition($position: PositionInput!) {
        createPosition(position: $position) {
          id
          name
        }
      }
    `;
  }

}

export class UpdateTaskMutationBuilder {

  build() {
    return gql`
      mutation UpdateTask($id: ID!, $task: TaskInput!) {
        updateTask (id: $id, task: $task) {
          id
        }
      }
    `;
  }

}

export class UpdateTaskReviewMutationBuilder {

  build() {
    return gql`
      mutation UpdateTaskReview($taskReview: TaskReviewInput!) {
        updateTaskReview (taskReview: $taskReview)
      }
    `;
  }

}
