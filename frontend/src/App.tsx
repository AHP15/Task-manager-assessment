import './App.css'
import { StateType, useAppContext } from './context';
import Loading from './components/Loading';
import Form from './components/Form'
import Home from './components/Home';


function App() {
  const state: StateType = useAppContext();

  // note: React-router would also work here (for larger apps)

  if (state.loading) {
    <Loading />
  }

  if (!state.loading && !state.user) {
    return <Form />
  }

  return <Home />;
}

export default App;
