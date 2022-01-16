import { gql } from '@apollo/client';

export class GetEventQueryBuilder {

  build() {
    return gql`
      query GetEvent($id: ID!) {
        getEvent(id: $id) {
          id
          name
          description
          recruitingStart
          recruitingEnd
          eventStart
          eventEnd
        }
      }
    `;
  }

}

export class CreateEventMutationBuilder {

  build() {
    return gql`
      mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
          id
          name
        }
      }
    `;
  }

}
