import styles from './login.module.css'
import { Link } from 'react-router-dom';


function Login() {

    return(
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1>Fitd.</h1>
        <input type="text" placeholder="Username" className={styles.loginInput} />
        <input type="password" placeholder="Password" className={styles.loginInput} />
        <button className={styles.loginButton}>Login</button>
        <p className={styles.loginFooter}>
          No Account? Create one <Link to="/signup">here</Link>
        </p>
      </div>
    </div>
    );
}

export default Login