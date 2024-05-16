import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import styles from '../styles/Form.module.css';

const Form = () => {
    const [signin, setSignin] = useState(true);
    return (
        <div className={styles.formPage}>
            {signin ? <Signin /> : <Signup />}
            <p className={styles.switchForm} onClick={() => setSignin(prev => !prev)}>
                {signin ? 'SignUp' : 'SignIn'}
            </p>
        </div>
    );
};

export default Form;