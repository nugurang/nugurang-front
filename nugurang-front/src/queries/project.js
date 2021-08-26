import { gql } from '@apollo/client';

const FRAGMENT_TEAM = `
  fragment team on Project {
    team {
      id
      getMembers(page: 0, pageSize: 100) {
        id
        name
        email
      }
    }
  }
`;
const FRAGMENT_WORKS = `
  fragment works on Project {
    works {
      id
      name
    }
  }
`;
const FRAGMENT_EVENT = `
  fragment event on Project {
    event {
      id
    }
  }
`;
const FRAGMENT_USERS = `
  fragment users on Project {
    getUsers(page: 0, pageSize: 100) {
      id
      name
      email
    }
  }
`;

export class GetProjectQueryBuilder {

  constructor() {
    this.team = false;
    this.works = false;
    this.event = false;
    this.users = false;
  }

  withTeam() {
    this.team = true;
    return this;
  }

  withWorks() {
    this.works = true;
    return this;
  }

  withEvent() {
    this.event = true;
    return this;
  }

  withUsers() {
    this.users = true;
    return this;
  }

  build() {
    return gql`
      query GetProject($id: ID!) {
        getProject(id: $id) {
          id
          name
          finished
          ${this.team ? '...team' : ''}
          ${this.works ? '...works' : ''}
          ${this.event ? '...event' : ''}
          ${this.users ? '...users' : ''}
        }
      }
      ${this.team ? FRAGMENT_TEAM : ''}
      ${this.works ? FRAGMENT_WORKS : ''}
      ${this.event ? FRAGMENT_EVENT : ''}
      ${this.users ? FRAGMENT_USERS : ''}
    `;
  }

}

export class GetProjectInvitationQueryBuilder {

  build() {
    return gql`
      query GetProjectInvitation($id: ID!) {
        getProjectInvitation(id: $id) {
          id
          status {
            id
            name
          }
          project {
            id
            name
          }
        }
      }
    `;
  }

}

export class CreateProjectMutationBuilder {

  build() {
    return gql`
      mutation CreateProject($team: ID!, $project: ProjectInput!) {
        createProject(team: $team, project: $project) {
          id
          name
        }
      }
    `;
  }

}

export class CreateProjectInvitationMutationBuilder {

  build() {
    return gql`
      mutation CreateProjectInvitations($invitation: ProjectInvitationInput!) {
        createProjectInvitations(invitation: $invitation) {
          id
        }
      }
    `;
  }

}

export class UpdateProjectMutationBuilder {

  build() {
    return gql`
      mutation UpdateProject($id: ID!, $project: ProjectInput!) {
        updateProject(id: $id, project: $project) {
          id
        }
      }
    `;
  }

}

export class UpdateProjectFinishMutationBuilder {

  build() {
    return gql`
      mutation UpdateProjectFinish($id: ID!) {
        updateProjectFinish(id: $id)
      }
    `;
  }

}

export class UpdateProjectInvitationAcceptedMutationBuilder {

  build() {
    return gql`
      mutation UpdateProjectInvitationAccepted($id: ID!) {
        updateProjectInvitationAccepted(id: $id)
      }
    `;
  }

}

export class UpdateProjectInvitationDeniedMutationBuilder {

  build() {
    return gql`
      mutation UpdateProjectInvitationDenied($id: ID!) {
        updateProjectInvitationDenied(id: $id)
      }
    `;
  }

}

export class DeleteProjectMutationBuilder {

  build() {
    return gql`
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
          id
        }
      }
    `;
  }

}
