import { OAuth2Provider } from "@/constants/oAuth2";

export interface OAuth2UserDTO {
  oAuth2Provider: OAuth2Provider;
  name: string;
  email: string;
}

export interface UserDTO {
  oAuth2Provider: OAuth2Provider;
  oAuth2Id: string;
  name: string;
  email: string;
  image?: {
    id: string;
    address: string;
  }
  biography?: string;
}
