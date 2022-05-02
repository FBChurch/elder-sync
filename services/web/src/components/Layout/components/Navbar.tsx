import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import logo from '../../../assets/fbclogo.jpeg';

import { logOut } from '../../../redux/users/userActions';

import { Badge, Avatar, Menu, Dropdown } from 'antd';

import NotificationsIcon from '@material-ui/icons/Notifications';

import { UserOutlined } from '@ant-design/icons';

import { openPanal } from '../../../redux/notifications/notificationActions';

import styles from '../../../styles/Layout/navbar.module.css';

function Navbar() {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const currentUser = useSelector(state => state.user.currentUser);

  const { notifications } = useSelector(state => state.notifications);

  const redirectToHome = () => {
    history.push('/');
  };

  const handleLogout = () => {
    dispatch(
      logOut(history, currentUser.organizationId, currentUser.subscriptions)
    );
  };

  const openNotificationsPanal = () => dispatch(openPanal());

  const unseen = notifications.filter(notif => {
    if (!notif.seen) return notif;
  }).length;

  const menu = (
    <Menu>
      {isLoggedIn ? (
        <Menu.Item danger onClick={handleLogout}>
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item onClick={() => history.push('/login')}>Login</Menu.Item>

          <Menu.Item onClick={() => history.push('/register/landlord')}>
            Create Landlord account
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <img
          className={styles.fbcLogo}
          alt="FBC logo"
          onClick={redirectToHome}
          src={logo}
        />
        <div className={styles.navItems}>
          {isLoggedIn && (
            <>
              <Badge count={unseen}>
                <NotificationsIcon
                  onClick={openNotificationsPanal}
                  style={{ color: 'black', cursor: 'pointer' }}
                />
              </Badge>
            </>
          )}
          <Dropdown overlay={menu} trigger={['click', 'hover']}>
            <Avatar size={35} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
