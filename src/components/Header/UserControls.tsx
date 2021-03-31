import { useSelector } from 'react-redux';
import Link from "next/link";

import styles from './UserControls.module.css';
import { AuthState, User } from "../../state/types/auth";
import { RootState } from "../../state/reducers";
import { EnvState } from "../../state/types/global";

interface UserControlProps {
  savedProfile?: User
}

const UserControls = ({ savedProfile }: UserControlProps) => {

  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const env = useSelector<RootState, EnvState>((state) => state.env);

  return (
    <div className={styles.content}>
      {
        user ? (
          <div id="logout-link">
            <Link href="/account">
              <div className={styles.avatar}>
                <img src={user.avatar ? `${env.MEDIA_URL}${user.avatar}?${(new Date()).getTime()}` : user.photo} />
              </div>
            </Link>
          </div>
        ) : (
          <div className={styles.loginLinkContainer} id="login-link">
            <Link href="/login">
              <a className={styles.loginLink}>Log in</a>
            </Link>
          </div>
        )
      }
    </div>
  );
};

export default UserControls;
