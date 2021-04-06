import { gql } from "@apollo/client";

export const UPDATE_USER = gql`mutation updateUser($uuid: String!, $values: UserInput!) {
  updateUser (uuid: $uuid, values: $values) {
    uuid,
    email,
    username,
    avatar,
    avatarSource,
    avatarX,
    avatarY,
    avatarScale
  }
}`;

export const GET_USER = gql`query getUser {
  getUser {
    uuid,
    email,
    username,
    photo,
    avatar,
    avatarSource,
    avatarX,
    avatarY,
    avatarScale,
    logins
  }
}`;
