import React, {createContext, useContext, useReducer, useEffect} from 'react';
import axios from 'axios';

const initialstate = {
    user: null,
    fetchingUser: true,
    completeToDos: [],
    incompleteToDos: [],
}

// reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
            };
        case "SET_COMPLETE_TODOS":
            return {
                ...state,
                completeToDos: action.payload,
            };
        case "SET_INCOMPLETE_TODOS":
            return {
                ...state,
                incompleteToDos: action.payload,
            };
        case "RESET_USER":
            return {
                ...state,
                user: null,
                completeToDos: [],
                incompleteToDos: [],
                fetchingUser: false,
            }
        default:
            return state;
    }
}

export const GlobalContext = createContext(initialstate);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialstate);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        try {
            // console.log("111");
            const res = await axios.get("http://localhost:5001/api/auth/current", {withCredentials: true});
            if (res.data) {
                console.log(res.data);
                const toDosRes = await axios.get("http://localhost:5001/api/todos/current", {withCredentials: true})
                if (toDosRes.data) {
                    dispatch({type: "SET_USER", payload: res.data});
                    dispatch({type: "SET_COMPLETE_TODOS", payload: toDosRes.data.completeTodos});
                    dispatch({type: "SET_INCOMPLETE_TODOS", payload: toDosRes.data.incompleteTodos});
                }
            } else {
                dispatch({type: "RESET_USER"});
            }
        } catch(err) {
            dispatch({type: "RESET_USER"});
            console.log(err);
        }
    }

    const Logout = async () => {
        try {
            await axios.put("http://localhost:5001/api/auth/logout");
            dispatch({type: "RESET_USER"});
        } catch(err) {
            console.log(err);
            dispatch({type: "RESET_USER"});
        }
    }

    const addTodo = (todo) => {
        dispatch({type: "SET_INCOMPLETE_TODOS", payload: [todo, ...state.incompleteToDos]});
    }

    const markComplete = (todo) => {
        dispatch({type: "SET_INCOMPLETE_TODOS", payload: state.incompleteToDos.filter((incompleteToDos) => incompleteToDos._id !== todo._id)});
        dispatch({type: "SET_COMPLETE_TODOS", payload: [todo, ...state.completeToDos]});
    }
    const markIncomplete = (todo) => {
        dispatch({type: "SET_COMPLETE_TODOS", payload: state.completeToDos.filter((completeToDos) => completeToDos._id !== todo._id)});
        const newIncomplete = [todo, ...state.incompleteToDos];
        dispatch({type: "SET_INCOMPLETE_TODOS", payload: newIncomplete.sort(
            (a, b) => b.createAt- a.createdAt
        ),
        });
    }

    const deleteTd = (todo) => {
        if (todo.complete) {
            dispatch({type: "SET_COMPLETE_TODOS", payload: state.completeToDos.filter((completeToDos) => completeToDos._id !== todo._id)});
        } else {
            dispatch({type: "SET_INCOMPLETE_TODOS", payload: state.incompleteToDos.filter((incompleteToDos) => incompleteToDos._id !== todo._id)});
        }
    }

    const saveTd = (todo) => {
        if (todo.complete) {
            dispatch({type: "SET_COMPLETE_TODOS", payload: state.completeToDos.map((completeToDos) => completeToDos._id !== todo._id ? completeToDos : todo)});
        } else {
            dispatch({type: "SET_INCOMPLETE_TODOS", payload: state.incompleteToDos.map((incompleteToDos) => incompleteToDos._id !== todo._id ? incompleteToDos : todo)});
        }
    }
    // action: get current user
    const value = {
        ...state,
        getCurrentUser,
        Logout,
        addTodo,
        markComplete,
        markIncomplete,
        deleteTd,
        saveTd,
    }
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider >
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}