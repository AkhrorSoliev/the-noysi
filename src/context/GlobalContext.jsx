import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const changeState = () => {};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    authReady: false,
  });
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
