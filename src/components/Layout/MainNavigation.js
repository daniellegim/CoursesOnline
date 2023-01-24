import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext);
  const history = useNavigate();
  const loggin = authCtx.isLoggedin;
  const logoutAction = () =>{
    authCtx.logout();
    history.replace('/');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>User App</div>
      </Link>
      <nav>
        <ul>
          { !loggin && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          { loggin && (
          <li>
            <button onClick={logoutAction}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
