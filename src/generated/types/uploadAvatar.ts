/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadAvatar
// ====================================================

export interface uploadAvatar_uploadAvatar {
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

export interface uploadAvatar {
  uploadAvatar: uploadAvatar_uploadAvatar | null;
}

export interface uploadAvatarVariables {
  file: any;
  type?: string | null;
}
