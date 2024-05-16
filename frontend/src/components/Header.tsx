import { useAppContext } from '../context';
import styles from '../styles/Home.module.css';

const Header = () => {
    const state = useAppContext();

    return (
        <header className={styles.header}>
            <h1>Task Manager</h1>
            <p className={styles.username}>{state.user?.fullname}</p>
        </header>
    );
};

export default Header;
