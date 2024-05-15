import './App.css'
import { StateType, useAppContext } from './context';
import Loading from './components/Loading';
import Form from './components/Loading';
import Home from './components/Loading';


function App() {
  const state: StateType = useAppContext() as StateType;

  if (state.loading) {
    return <Loading />
  }

  if (!state.loading && !state.user) {
    return <Form />
  }

  return <Home />
}

export default App;
