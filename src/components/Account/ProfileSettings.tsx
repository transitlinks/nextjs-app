import styles from './ProfileSettings.module.css';
import { useState } from "react";
import AvatarEditor, { AvatarEditorProps, Position } from 'react-avatar-editor';
import ValidatedInput, { InputState, TextInputState } from "../ValidatedInput/ValidatedInput";
import { isValidUsername } from "../ValidatedInput/validators";
import Button from "@material-ui/core/Button";
import { UserInput } from "../../generated/types/globalTypes";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { EnvState } from "../../state/types/global";

export interface ProfileSettingsInputState extends InputState {
  value: UserInput;
  avatarEditor?: any | null;
  avatarFile?: string | null;
}

interface ProfileSettingsProps {
  user: any;
  saveProfileSettings: any;
  onChange: (input: ProfileSettingsInputState) => void;
  withSubmit?: boolean
}

const ProfileSettings = ({ user, saveProfileSettings, onChange, withSubmit }: ProfileSettingsProps) => {

  const env = useSelector<RootState, EnvState>((state) => state.env);

  const [usernameInput, setUsernameInput] = useState<TextInputState>({ value: user?.username, pass: false });
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
  const [avatarEditor, setAvatarEditor] = useState<any | null>(null);
  const [avatarPosition, setAvatarPosition] = useState<Position | null>({ x: user.avatarX, y: user.avatarY });
  const [avatarEditorLoaded, setAvatarEditorLoaded] = useState<boolean>(false);

  const [profileSettings, setProfileSettings] = useState<UserInput>({});

  const onFileInputChange = (event: any) => {
    setAvatarFile(event.target.files[0]);
    const profileSettingsValues = { ...profileSettings, avatarFile: event.target.files[0] };
    setProfileSettings(profileSettingsValues);
    onChange({ pass: usernameInput.pass, value: profileSettingsValues });
    console.log('profile.avatarFile', event.target.files[0]);
  };

  const saveUserProfile = () => {
    saveProfileSettings();
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
                                const profileSettingsValues = { ...profileSettings, username: usernameInput.value };
                                setProfileSettings(profileSettingsValues);
                                onChange({ pass: usernameInput.pass, value: profileSettingsValues });
                              }} />
            </div>
          </div>
          <div className={styles.avatar}>
            {
              <div className={styles.editAvatar}>
                <AvatarEditor
                  ref={(editor: any | null) => {
                    if (!avatarEditor && editor?.loaded) {
                      console.log('ref', editor);
                      setAvatarEditor(editor);
                      const profileSettingsValues = { ...profileSettings, avatarEditor: editor };
                      setProfileSettings(profileSettingsValues);
                      onChange({ pass: usernameInput.pass, value: profileSettingsValues });
                    }
                  }}
                  onPositionChange={(position: Position) => {
                    setAvatarPosition(position);
                    const profileSettingsValues = { ...profileSettings, avatarX: position.x, avatarY: position.y };
                    setProfileSettings(profileSettingsValues);
                    onChange({ pass: usernameInput.pass, value: profileSettingsValues });
                  }}
                  image={avatarFile || `${env.MEDIA_URL}${user.avatarSource}?${(new Date()).getTime()}`}
                  width={74}
                  height={74}
                  border={2}
                  position={avatarPosition || { x: user.avatarX, y: user.avatarY }}
                  borderRadius={37}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1}
                  rotate={0}
                />
                <div className={styles.editAvatarButton}>
                  <input type="file" name="file" id="file" onChange={onFileInputChange} className={styles.fileInput} />
                  <label htmlFor="file">
                    <AddAPhotoIcon style={{ fontSize: '30px' }} onClick={() => {

                    }} />
                  </label>
                </div>
              </div>
            }
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
