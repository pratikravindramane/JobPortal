import { createContext, useEffect, useReducer } from "react";

export const authContext = createContext({ user: null });

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    return serializedState ? JSON.parse(serializedState) : { user: null };
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return { user: null };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch (error) {
    // Handle errors
  }
};
export const AuthContenxtProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null }, loadState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  useEffect(() => {
    saveState(state);
  }, [state]);
  return (
    <authContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};
