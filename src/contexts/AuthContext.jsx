import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { account } from "../appwrite/config";
import { AppwriteException } from "appwrite";
import { ID } from "appwrite";
import LoadingPage from "../pages/LoadingPage";

const initState = {
  user: null,
  loading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "auth/loggedin":
      return { ...state, loading: false, user: action.payload };
    case "auth/logout":
      return { ...state, loading: false, user: null };
    case "auth/error":
      return { ...state, loading: false, error: action.payload };
    case "auth/":
      return;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [{ user, loading, error }, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const createAccount = async (email, password) => {
    try {
      dispatch({ type: "loading" });
      const res = await account.create(ID.unique(), email, password);
      console.log("SESSION :", res);
      dispatch({ type: "auth/loggedIn", payload: res });
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message });
    }
  };

  const loginAccount = async (email, password) => {
    try {
      dispatch({ type: "loading" });
      console.log("Send login request");
      const res = await account.createEmailSession(email, password);
      console.log("SESSION :", res);
      const session = await account.get();
      dispatch({ type: "auth/loggedin", payload: session });
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: "loading" });
      await account.deleteSession("current");
      dispatch({ type: "auth/logout" });
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message });
    }
  };

  const checkUserStatus = async () => {
    try {
      dispatch({ type: "loading" });
      const session = await account.get();
      dispatch({ type: "auth/loggedin", payload: session });
    } catch (e) {
      dispatch({ type: "auth/error", payload: e.message });
      dispatch({ type: "auth/logout" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginAccount,
        logout,
        createAccount,
        loading,
        user,
        error,
      }}
    >
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
