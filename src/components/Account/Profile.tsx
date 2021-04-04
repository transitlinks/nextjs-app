import styles from './Profile.module.css';
import { isValidEmail, isValidPassword } from "../ValidatedInput/validators";
import ValidatedInput, { InputState, TextInputState } from "../ValidatedInput/ValidatedInput";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { updateUser, updateUserVariables } from "../../generated/types/updateUser";
import { UPDATE_USER } from '../../queries/user';
import ProfileSettings, { ProfileSettingsInputState } from './ProfileSettings';
import { UserInput } from '../../generated/types/globalTypes';

interface ProfileProps {
  user: UserInput;
}

const Profile = ({ user }: ProfileProps) => {

  const getUpdateUserMutation = () => useMutation<
    updateUser,
    updateUserVariables
    >(UPDATE_USER, { errorPolicy: 'all' });

  const [updateProfileSettings, updateProfileSettingsResult] = getUpdateUserMutation();
  const [updatePassword, updatePasswordResult] = getUpdateUserMutation();

  const profileUser = updateProfileSettingsResult?.data?.updateUser || user;

  let { uuid } = profileUser || {};

  const [emailInput, setEmailInput] = useState<TextInputState>({ value: user?.email || '', pass: true });
  const [profileSettingsInput, setProfileSettingsInput] = useState<ProfileSettingsInputState>({
    value: {
      username: profileUser?.username || ''
    },
    pass: true
  });
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

  const saveProfileSettings = (uuid: string, values: any) => {
    return updateProfileSettings({
      variables: {
        uuid,
        values
      }
    });
  };

  const valuesChanged = profileUser && (
    profileUser.username !== profileSettingsInput.value.username ||
    profileUser.email !== emailInput.value
  );

  const valuesValid = emailInput.pass && profileSettingsInput.pass;

	return (
    <div>
      <div>
        <ProfileSettings user={user} saveProfileSettings={saveProfileSettings}
                         onChange={(profileSettingsInput: ProfileSettingsInputState) => {
                           setProfileSettingsInput(profileSettingsInput);
                         }}/>
      </div>
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
                    onClick={() => saveProfileSettings(uuid!, { email: emailInput.value, ...profileSettingsInput.value })}>
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
      </div>
    </div>
  );

};

export default Profile;
