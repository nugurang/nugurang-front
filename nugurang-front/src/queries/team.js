import { gql } from '@apollo/client';

const FRAGMENT_PROJECTS = `
  fragment projects on Team {
    projects {
      id
      name
      getUsers(page: 0, pageSize: 100) {
        id
        name
        image {
          id
          address
        }
      }
      finished
    }
  }
`;
const FRAGMENT_OWNER = `
  fragment owner on Team {
    owner {
      id
      name
      email
      image {
        id
        address
      }
    }
  }
`;
const FRAGMENT_MEMBERS = `
  fragment members on Team {
    getMembers(page: 0, pageSize: 100) {
      id
      name
      email
      image {
        id
        address
      }
    }
  }
`;

export class GetTeamQueryBuilder {

  constructor() {
    this.projects = true;
    this.owner = false;
    this.members = false;
  }

  withProjects() {
    this.projects = true;
    return this;
  }

  withOwner() {
    this.owner = true;
    return this;
  }

  withMembers() {
    this.members = true;
    return this;
  }

  build() {
    return gql`
      query GetTeam($id: ID!) {
        getTeam(id: $id) {
          id
          name
        }
        ${this.projects ? '...projects' : ''}
        ${this.owner ? '...owner' : ''}
        ${this.members ? '...members' : ''}
      }
      ${FRAGMENT_PROJECTS}
      ${FRAGMENT_OWNER}
      ${FRAGMENT_MEMBERS}
    `;
  }

}

export class GetTeamInvitationQueryBuilder {

  build() {
    return gql`
      query GetTeamInvitation($id: ID!) {
        getTeamInvitation(id: $id) {
          id
          status {
            id
            name
          }
          team {
            id
            name
          }
        }
      }
    `;  
  }

}

export class CreateTeamMutationBuilder {

  build() {
    return gql`
      mutation CreateTeam($team: TeamInput!) {
        createTeam(team: $team) {
          id
          name
        }
      }
    `;
  }

}

export class CreateTeamInvitationsMutationBuilder {

  build() {
    return gql`
      mutation CreateTeamInvitations($invitation: TeamInvitationInput!) {
        createTeamInvitations(invitation: $invitation) {
          id
        }
      }
    `;
  }

}

export class UpdateTeamMutationBuilder {

  build() {
    return gql`
      mutation UpdateTeam($id: ID!, $team: TeamInput!) {
        updateTeam(id: $id, team: $team) {
          id
        }
      }
    `;
  }

}

export class UpdateTeamInvitationAcceptedMutationBuilder {

  build() {
    return gql`
      mutation UpdateTeamInvitationAccepted($id: ID!) {
        updateTeamInvitationAccepted(id: $id)
      }
    `;
  }

}

export class UpdateTeamInvitationDeniedMutationBuilder {

  build() {
    return gql`
      mutation UpdateTeamInvitationDenied($id: ID!) {
        updateTeamInvitationDenied(id: $id)
      }
    `;
  }

}

export class DeleteTeamMutationBuilder {

  build() {
    return gql`
      mutation DeleteTeam($id: ID!) {
        deleteTeam(id: $id) {
          id
        }
      }
    `;
  }

}
