import { useAppContext } from '../context';

const Header = () => {
    const state = useAppContext();

    return (
        <header>
            <h1>Task Manager</h1>
            <p>{state.user?.fullname}</p>
        </header>
    );
};

export default Header;
