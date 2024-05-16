import request, { Response } from '../request';
import styles from '../styles/Home.module.css';

const Header = () => {
    const signout = async () => {
        const res: Response = await request('/auth/signout', {
            method: 'get'
        });

        if (res.success) {
            window.location.reload();
        }
    }
    return (
        <header className={styles.header}>
            <h1>Task Manager</h1>
            <button onClick={signout} className={styles.signotBtn}>Signout</button>
        </header>
    );
};

export default Header;
