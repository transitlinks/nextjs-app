/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "User";
  uuid: string | null;
  email: string | null;
  username: string | null;
  avatar: string | null;
  avatarSource: string | null;
  avatarX: number | null;
  avatarY: number | null;
  avatarScale: number | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  uuid: string;
  values: UserInput;
}
