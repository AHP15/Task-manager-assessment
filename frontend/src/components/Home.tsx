import Header from './Header';
import Tasks from './Tasks';
import CreateTask from './CreateTask';
import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <Header />
            <div className={styles.taskContent}>
                <Tasks />
                <CreateTask />
            </div>
        </div>
    );
};

export default Home;