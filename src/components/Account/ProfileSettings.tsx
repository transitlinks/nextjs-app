import styles from './ProfileSettings.module.css';
import { useState } from "react";
import ValidatedInput, { InputState, TextInputState } from "../ValidatedInput/ValidatedInput";
import { isValidUsername } from "../ValidatedInput/validators";
import Button from "@material-ui/core/Button";
import { UserInput } from "../../generated/types/globalTypes";

export interface ProfileSettingsInputState extends InputState {
  value: UserInput;
}

interface ProfileSettingsProps {
  user: any;
  saveProfileSettings: any;
  onChange: (input: ProfileSettingsInputState) => void;
  withSubmit?: boolean
}

const ProfileSettings = ({ user, saveProfileSettings, onChange, withSubmit }: ProfileSettingsProps) => {


  const [usernameInput, setUsernameInput] = useState<TextInputState>({ value: user?.username, pass: false });

  const onFileInputChange = (event: any) => {
    console.log('profile.avatarFile', event.target.files[0]);
  };

  const saveUserProfile = () => {
    saveProfileSettings(user.uuid, { username: usernameInput.value });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.settings}>
          <div className={styles.displayName}>
            <div className={styles.displayNameLabel}>
              Display name
            </div>
            <div className={styles.displayNameInput}>
              <ValidatedInput id="username-input"
                              name="username"
                              value={usernameInput.value}
                              validate={isValidUsername}
                              onChange={(usernameInput: TextInputState) => {
                                setUsernameInput(usernameInput);
                                onChange({ pass: usernameInput.pass, value: { username: usernameInput.value } });
                              }} />
            </div>
          </div>
        </div>
        {
          withSubmit &&
            <div className={styles.submit}>
              <Button className={styles.button} variant="contained" disabled={!usernameInput.pass} onClick={saveUserProfile}>
                Confirm profile settings
              </Button>
            </div>
        }
      </div>
    </div>
  );

};

export default ProfileSettings;
