import {
    createContext,
    useContext,
    useEffect,
    useReducer
} from 'react';

import React from 'react';

import App from '../App';
import request from '../request.ts';
import {
    USER_SHOULD_SIGNIN,
    SET_USER,
    ADD_TASK
} from './actions.ts'

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

export function useAppContext() {
    return useContext(AppContext).state;
}

export function useDispatch(): React.Dispatch<Action> {
    return useContext(AppContext).dispatch as React.Dispatch<Action>;
}


function stateReducer(state: StateType, action: Action): StateType {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                tasks: action.payload.tasks
            };
        case USER_SHOULD_SIGNIN:
            return {
                ...state,
                loading: false,
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task]
            };
        default:
            return state;
    }
}

type AppComponent = React.ReactElement<unknown, React.JSXElementConstructor<typeof App>>;
export default function ContextProvider({ children }: { children: AppComponent }) {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    async function getUser() {
        const res = await request('/user', {
            method: 'get'
        });
        if (res.success) {
            dispatch({ type: SET_USER, payload: res.data });
        } else {
            dispatch({ type: USER_SHOULD_SIGNIN });
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}
