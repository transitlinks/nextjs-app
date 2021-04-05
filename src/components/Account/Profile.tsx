import styles from './Profile.module.css';
import { isValidEmail, isValidPassword } from "../ValidatedInput/validators";
import ValidatedInput, { InputState, TextInputState } from "../ValidatedInput/ValidatedInput";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { updateUser, updateUserVariables } from "../../generated/types/updateUser";
import { UPDATE_USER } from '../../queries/user';
import { UserInput } from '../../generated/types/globalTypes';

import dynamic from "next/dynamic";
import { Position } from "react-avatar-editor";
const ProfileSettings = dynamic(() => import('./ProfileSettings'), { ssr: false });

interface ProfileProps {
  user: UserInput;
  withAccount: boolean;
}

const Profile = ({ user, withAccount }: ProfileProps) => {

  const getUpdateUserMutation = () => useMutation<
    updateUser,
    updateUserVariables
    >(UPDATE_USER, { errorPolicy: 'all' });

  const [updateProfileSettings, updateProfileSettingsResult] = getUpdateUserMutation();
  const [updatePassword, updatePasswordResult] = getUpdateUserMutation();

  //console.log('Update profile result', updateProfileSettingsResult);

  const profileUser = updateProfileSettingsResult?.data?.updateUser || user;

  let { uuid, avatarX, avatarY } = profileUser || {};

  const [emailInput, setEmailInput] = useState<TextInputState>({ value: user?.email || '', pass: true });
  const [usernameInput, setUsernameInput] = useState<TextInputState>({ value: user?.username || '', pass: true });
  const [avatarEditor, setAvatarEditor] = useState<any | null>(null);
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
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

  const saveProfileSettings = (input?: UserInput) => {

    if (avatarFile) {
      console.log('Upload file: ' + avatarFile);
      /*
      uploadFiles({
        entityType: 'AvatarSource',
        entityUuid: uuid!
      }, [avatarFile]);
       */

    }

    if (avatarFile) {
      const canvasScaled = avatarEditor.getImageScaledToCanvas();
      canvasScaled.toBlob((blob: any) => {
        const file = new File([blob], `${uuid}.jpg`, { type: 'image/jpeg' });
        console.log('Upload blob: ' + file);
        /*
        uploadFiles({
          entityType: 'Avatar',
          entityUuid: uuid!
        }, [file]);
         */
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

    console.log('Update payload', updatePayload);
    return updateProfileSettings(updatePayload);

  };

  //console.log('CHECK', profileUser, usernameInput.value, emailInput.value, avatarPosition.x, avatarPosition.y, avatarFile);
  const valuesChanged = profileUser && (
    profileUser.username !== usernameInput.value ||
    profileUser.email !== emailInput.value ||
    profileUser.avatarX !== avatarPosition.x ||
    profileUser.avatarY !== avatarPosition.y ||
    avatarFile
  );

  const valuesValid = emailInput.pass && usernameInput.pass;

	return (
    <div>
      <div>
        <ProfileSettings
          profileSettingsValues={user}
          onChangeUsername={(input: TextInputState) => {
             setUsernameInput(input);
           }}
           onChangeAvatarFile={(avatarFile: string) => {
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
        withAccount ?
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
