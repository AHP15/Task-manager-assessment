import Header from './Header';
import Tasks from './Tasks';
import CreateTask from './CreateTask';

const Home = () => {
    return (
        <div>
            <Header />
            <div>
                <Tasks />
                <CreateTask />
            </div>
        </div>
    );
};

export default Home;