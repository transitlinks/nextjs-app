/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser {
  __typename: "User";
  uuid: string | null;
  email: string | null;
  username: string | null;
  photo: string | null;
  avatar: string | null;
  avatarSource: string | null;
  avatarX: number | null;
  avatarY: number | null;
  avatarScale: number | null;
}

export interface getUser {
  getUser: getUser_getUser | null;
}
