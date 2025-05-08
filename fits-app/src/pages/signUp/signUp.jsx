import React from 'react';
import styles from './signup.module.css';

function SignUp() {
  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupCard}>
        <h1>Sign Up</h1>
        <input type="text" placeholder="First name" className={styles.signupInput} />
        <input type="text" placeholder="Last name" className={styles.signupInput} />
        <input type="text" placeholder="Username" className={styles.signupInput} />
        <input type="password" placeholder="Password" className={styles.signupInput} />
        <button className={styles.signupButton}>Login</button>
      </div>
    </div>
  );
}

export default SignUp;
