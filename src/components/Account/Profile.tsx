import styles from './Profile.module.css';
import { isValidEmail, isValidPassword } from "../ValidatedInput/validators";
import ValidatedInput, { TextInputState } from "../ValidatedInput/ValidatedInput";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { updateUser, updateUserVariables } from "../../generated/types/updateUser";
import { UPDATE_USER } from '../../queries/user';
import { UserInput } from '../../generated/types/globalTypes';

import dynamic from "next/dynamic";
import { Position } from "react-avatar-editor";
import { UPLOAD_AVATAR } from "../../queries/account";
import { uploadAvatar, uploadAvatarVariables } from "../../generated/types/uploadAvatar";
import { useDispatch } from "react-redux";
import { updateHeader } from "../../state/actions/header";
import { getUser_getUser } from "../../generated/types/getUser";
const ProfileSettings = dynamic(() => import('./ProfileSettings'), { ssr: false });

interface ProfileProps {
  user: getUser_getUser;
}

const Profile = ({ user }: ProfileProps) => {

  const dispatch = useDispatch();

  const getUpdateUserMutation = () => useMutation<
    updateUser,
    updateUserVariables
    >(UPDATE_USER, { errorPolicy: 'all' });

  const [updateProfileSettings, updateProfileSettingsResult] = getUpdateUserMutation();
  const [updatePassword, updatePasswordResult] = getUpdateUserMutation();

  const [uploadAvatar, uploadAvatarResult] = useMutation<uploadAvatar, uploadAvatarVariables>(UPLOAD_AVATAR, { errorPolicy: 'all' });
  const uploadedAvatar = uploadAvatarResult?.data?.uploadAvatar?.avatar;
  useEffect(() => {
    if (uploadedAvatar) {
      dispatch(updateHeader({ avatar: uploadedAvatar }));
    }
  }, [uploadedAvatar]);

  const profileUser = updateProfileSettingsResult?.data?.updateUser || user;

  let { uuid, avatarX, avatarY } = profileUser || {};

  const [emailInput, setEmailInput] = useState<TextInputState>({ value: user?.email || '', pass: true });
  const [usernameInput, setUsernameInput] = useState<TextInputState>({ value: user?.username || '', pass: true });
  const [avatarEditor, setAvatarEditor] = useState<any | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPosition, setAvatarPosition] = useState<Position>({ x: avatarX || 0, y: avatarY || 0 });
  const [avatarSource, setAvatarSource] = useState<string | null>(user?.avatarSource || null);
  const [passwordInput, setPasswordInput] = useState<TextInputState>({ value: '', pass: false });
  const [passwordUpdateResultMessage, setPasswordUpdateResultMessage] = useState<string | null>(null);

  const getResultMessage = (result: any | undefined | null, success: string) => {
    if (result?.error) {
      return result?.error?.message;
    } else if (result?.data?.updateUser) {
      return success;
    }
    return null;
  };

  const updateProfileSettingsResultMessage = getResultMessage(updateProfileSettingsResult, 'Profile saved');

  const updatedProfileSettings = updateProfileSettingsResult?.data?.updateUser;
  const updatedProfileSettingsError = updateProfileSettingsResult?.error;
  useEffect(() => {
    if (updatedProfileSettings && !updatedProfileSettingsError) {
      if (user.logins === 1) window.location.href = '/';
      setAvatarFile(null);
    }
  }, [updatedProfileSettings, updatedProfileSettingsError]);

  const updatedPassword = updatePasswordResult?.data?.updateUser;
  const updatedPasswordError = updatePasswordResult?.error;
  useEffect(() => {
    if (updatedPassword || updatedPasswordError) {
      setPasswordInput({ value: '', pass: false });
      setPasswordUpdateResultMessage(getResultMessage(updatePasswordResult, 'Password changed'));
    }
  }, [updatedPassword, updatedPasswordError]);

  const savePassword = () => {
    return updatePassword({
      variables: {
        uuid: uuid!,
        values: { password: passwordInput.value }
      }
    });
  };

  const avatarPositionChanged = (
    profileUser.avatarX !== avatarPosition.x ||
    profileUser.avatarY !== avatarPosition.y
  );

  const valuesChanged = profileUser && (
    profileUser.username !== usernameInput.value ||
    profileUser.email !== emailInput.value ||
    avatarPositionChanged ||
    avatarFile
  );

  const saveProfileSettings = (input?: UserInput) => {

    if (avatarFile) {
      uploadAvatar({ variables: { file: avatarFile, type: 'source' } });
    }

    if (avatarFile || avatarPositionChanged) {
      const canvasScaled = avatarEditor.getImageScaledToCanvas();
      canvasScaled.toBlob((blob: any) => {
        const file = new File([blob], `${uuid}.jpg`, { type: 'image/jpeg' });
        uploadAvatar({ variables: { file, type: 'scaled' } });
      }, 'image/jpeg');
    }

    const updatePayload = {
      variables: {
        uuid: uuid!,
        values: input || {
          email: emailInput.value,
          username: usernameInput.value,
          avatarX: avatarPosition.x,
          avatarY: avatarPosition.y
        }
      }
    };

    return updateProfileSettings(updatePayload);

  };

  const valuesValid = emailInput.pass && usernameInput.pass;

	return (
    <div>
      {
        user.logins !== 1 &&
          <div className={styles.logOut}>
            <Button color="primary" variant="contained" onClick={() => { location.href = "/auth/logout" }}>
              Sign out
            </Button>
          </div>
      }
      <div>
        <ProfileSettings
          profileSettingsValues={user}
          onChangeUsername={(input: TextInputState) => {
             setUsernameInput(input);
           }}
           onChangeAvatarFile={(avatarFile: File) => {
             setAvatarFile(avatarFile);
           }}
           onChangeAvatarPosition={(position: Position) => {
              setAvatarPosition(position);
           }}
           onLoadAvatarEditor={(editor: any) => {
             setAvatarEditor(editor);
           }} />
      </div>
      {
        user.logins !== 1 ?
          <div id="profile-fields" className={styles.emailPassword}>
            <div className={styles.email}>
              <ValidatedInput id="email-input"
                              name="email"
                              value={emailInput.value}
                              validate={isValidEmail}
                              onChange={(emailInput: TextInputState) => setEmailInput(emailInput)} />
              <div className={styles.save}>
                { !valuesChanged && updateProfileSettingsResultMessage }
                <Button className={styles.button} variant="contained" disabled={!valuesChanged || !valuesValid}
                        onClick={() => saveProfileSettings()}>
                  Save
                </Button>
              </div>
            </div>
            <div id="password-reset" className={styles.password}>
              <div>
                New password
                <ValidatedInput id="password-input"
                                name="password"
                                value={passwordInput.value}
                                validate={isValidPassword}
                                masked={true}
                                onChange={(passwordInput: TextInputState) => {
                                  setPasswordInput(passwordInput);
                                  setPasswordUpdateResultMessage(null);
                                }} />
              </div>
              <div className={styles.save}>
                { passwordUpdateResultMessage }
                <Button className={styles.button} variant="contained" disabled={!passwordInput.pass} onClick={savePassword}>
                  CHANGE
                </Button>
              </div>
            </div>
          </div> :
          <div className={styles.submit}>
            <Button className={styles.button} variant="contained" disabled={!usernameInput.pass} onClick={() => saveProfileSettings()}>
              Confirm profile settings
            </Button>
          </div>
      }
    </div>
  );

};

export default Profile;
