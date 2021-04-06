import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";

import styles from './UserControls.module.css';
import { User } from "../../state/types/auth";
import { RootState } from "../../state/reducers";
import { EnvState } from "../../state/types/global";
import { useQuery } from "@apollo/client";
import { getUser } from "../../generated/types/getUser";
import { GET_USER } from '../../queries/user';
import { HeaderState } from "../../state/types/header";

interface UserControlProps {
  savedProfile?: User
}

const UserControls = ({ savedProfile }: UserControlProps) => {

  const { data } = useQuery<getUser>(GET_USER);
  const env = useSelector<RootState, EnvState>((state) => state.env);
  const { avatar } = useSelector<RootState, HeaderState>((state) => state.header);

  const user = data?.getUser;

  return (
    <div className={styles.content}>
      {
        user ? (
          <div id="logout-link">
            <Link href="/account">
              <div className={styles.avatar}>
                <img src={`${env.MEDIA_URL}${avatar || user.avatar}?${(new Date()).getTime()}`} />
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
