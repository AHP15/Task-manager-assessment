import { useState } from "react";
import Input from "./Input";
import request, { Response } from "../request";
import { useDispatch } from "../context";
import { SET_USER } from "../context/actions";
import Loading from "./Loading";
import styles from '../styles/Form.module.css';


const Signin = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
            error: ''
        }));

        setError(prev => ({
            ...prev,
            [event.target.name]: ''
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isInvalid = false
        if (!state.email) {
            setError(prev => ({ ...prev, email: "email can't be empty" }));
            isInvalid = true;
        }
        if (!state.password) {
            setError(prev => ({ ...prev, password: "password can't be empty" }));
            isInvalid = true;
        }

        if (isInvalid) return;

        setLoading(true);

        const response: Response = await request(
            '/auth/signin',
            {
                method: 'post',
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.success) {
            dispatch({ type: SET_USER, payload: response.data });
        } else {
            setState(prev => ({
                ...prev,
                error: response.error
            }))
        }

        setLoading(false);

    }

    if (loading) return <Loading />

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>SignIn</h1>
            {state.error && <p className={styles.serverError}>{state.error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    options={{
                        type: 'email',
                        name: 'email',
                        value: state.email,
                        placeholder: 'Type your email',
                        onChange: handleChange
                    }}
                    error={error.email}
                />
                <Input
                    options={{
                        type: 'password',
                        name: 'password',
                        value: state.password,
                        placeholder: 'Type your password',
                        onChange: handleChange
                    }}
                    error={error.password}
                />
                <button type="submit" className={styles.btn}>SignIn</button>
            </form>
        </div>
    );
}

export default Signin;
