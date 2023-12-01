import React, {createContext, useContext, useReducer, useEffect, useState} from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [loggedin, setLoggedin] = useState(false);
    return (
        <GlobalContext.Provider value={{loggedin, setLoggedin}}>
            {props.children}
        </GlobalContext.Provider >
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}