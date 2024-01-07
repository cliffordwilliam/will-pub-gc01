import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        console.log(token, "LoginProvider get start token");
        setIsLoggedIn(token ? true : false);
      } catch (error) {
        throw error;
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    console.log(isLoggedIn, "LoginProvider isLoggedIn updated");
  }, [isLoggedIn]);

  const setTokenLogin = async (token) => {
    try {
      await SecureStore.setItemAsync("token", token);
      const checkToken = await SecureStore.getItemAsync("token");
      console.log(checkToken, "LoginProvider set token");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTokenLogin = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("LoginProvider del token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setTokenLogin, removeTokenLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};
