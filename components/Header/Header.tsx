import ExploreIcon from '@material-ui/icons/Explore';
import DirectionsIcon from '@material-ui/icons/Directions';
import styles from './Header.module.css';
import UserControls from './UserControls';

const Header = () => {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.headerLeft}>
          <div className={styles.logoBar} onClick={() => {
            // TODO: navigate
          }}>
            <div className={styles.logoBarText}>
              <div className={styles.logoBarName}>Transitlinks.net</div>
              <div className={styles.logoBarCaption}>SOCIAL WORLD MAP</div>
            </div>
          </div>
          <div className={styles.logo}>
            <a href="/">
              <img src="/images/logo-square.png" width={32} height={32} />
            </a>
          </div>
          <div className={styles.naviButton}>
            <a href="/discover">
              <ExploreIcon style={{ fontSize: '40px' }} />
            </a>
          </div>
          <div className={styles.naviButton}>
            <a href="/discover">
              <DirectionsIcon style={{ fontSize: '40px' }} />
            </a>
          </div>
        </div>
        <div className={styles.headerRight}>
          <UserControls />
        </div>
      </div>
    </div>
  );
};

export default Header;
