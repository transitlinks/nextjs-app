import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadAvatar($file: Upload!, $type: String) {
    uploadAvatar(file: $file, type: $type) {
      uuid,
      email,
      username,
      avatar,
      avatarSource,
      avatarX,
      avatarY,
      avatarScale
    }
  }
`;
