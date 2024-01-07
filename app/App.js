import React from "react";
import MainStack from "./navigation/MainStack";
import { LoginProvider } from "./context/LoginContext";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainStack />
      </LoginProvider>
    </ApolloProvider>
  );
}
