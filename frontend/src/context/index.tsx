import {
    createContext,
    useContext,
    useReducer
} from 'react';

import React from 'react';

import App from '../App';


// types
type Task = {
    title: string,
    description: string,
    status: string
};
export type StateType = {
    loading: boolean,
    user: {
        fullname: string,
        email: string
    } | null,
    tasks: Task[]
};
type Action = {
    payload?: any,
    type: string,
};
type Context = {
    state: StateType,
    dispatch?: React.Dispatch<Action>,
};



const initialState: StateType = {
    loading: true,
    user: null,
    tasks: []
};

const AppContext = createContext<Context>({ state: initialState });

export function useAppContext(selector?: (state: StateType) => unknown) {
    return selector ? selector(useContext(AppContext).state) : useContext(AppContext).state;
}

export function useDispatch(): React.Dispatch<Action> {
    return useContext(AppContext).dispatch as React.Dispatch<Action>;
}


function reducer(state: StateType, action: Action): StateType {
    switch (action.type) {
        default:
            return state;
    }
}

type AppComponent = React.ReactElement<unknown, React.JSXElementConstructor<typeof App>>;
export default function ContextProvider({ children }: { children: AppComponent }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}
