import { gql } from '@apollo/client';

export class GetImageQueryBuilder {

  build() {
    return gql`
      query getImage($id: ID!) {
        getImage(id: $id) {
          id
          address
        }
      }
    `;
  }

}

export class CreateImageMutationBuilder {

  build() {
    return gql`
      mutation createImage($address: String!) {
        createImage (address: $address) {
          id
          address
        }
      }
    `;  
  }

}
