import styles from './ProfileSettings.module.css';
import { ChangeEvent, ChangeEventHandler, EventHandler, FormEvent, FormEventHandler, useState } from "react";
import ValidatedInput, { TextInputState } from "../ValidatedInput/ValidatedInput";
import { isValidUsername } from "../ValidatedInput/validators";
import { UserInput } from "../../generated/types/globalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { EnvState } from "../../state/types/global";
import AvatarEditor, { Position } from "react-avatar-editor";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { getImageUrl } from "../utils";

interface ProfileSettingsProps {
  profileSettingsValues: UserInput;
  onChangeUsername: (input: TextInputState) => void;
  onChangeAvatarFile: (avatarFile: File) => void;
  onChangeAvatarPosition: (avatarFile: Position) => void;
  onLoadAvatarEditor: (avatarEditor: any) => void;
}

const ProfileSettings = (
  {
    profileSettingsValues,
    onChangeUsername,
    onChangeAvatarFile,
    onLoadAvatarEditor,
    onChangeAvatarPosition
  }: ProfileSettingsProps) => {

  const env = useSelector<RootState, EnvState>((state) => state.env);

  const { avatarSource, avatarX, avatarY, username } = profileSettingsValues;
  let initialAvatarSource = getImageUrl(avatarSource, env.MEDIA_URL);

  const [usernameInput, setUsernameInput] = useState<TextInputState>({ value: username || '', pass: false });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarEditor, setAvatarEditor] = useState<any | null>(null);
  const [avatarPosition, setAvatarPosition] = useState<Position>({ x: avatarX || 0, y: avatarY || 0 });

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target.files;
    if (files && files.length > 0) {
      const [file] = files;
      setAvatarFile(file);
      onChangeAvatarFile(file);
    }
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
                              onChange={(input: TextInputState) => {
                                setUsernameInput(input);
                                onChangeUsername(input);
                              }} />
            </div>
          </div>
          <div className={styles.avatar}>
            {
              <div className={styles.editAvatar}>
                <AvatarEditor
                  ref={(editor: AvatarEditor & { loaded: boolean }) => {
                    if (!avatarEditor && editor && !editor.loaded) {
                      editor.loaded = true;
                      setAvatarEditor(editor);
                      onLoadAvatarEditor(editor);
                    }
                  }}
                  onPositionChange={(position) => {
                    setAvatarPosition(position);
                    onChangeAvatarPosition(position);
                  }}
                  image={avatarFile || `${initialAvatarSource}?${(new Date()).getTime()}`}
                  width={74}
                  height={74}
                  border={2}
                  position={avatarPosition}
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
      </div>
    </div>
  );

};

export default ProfileSettings;
