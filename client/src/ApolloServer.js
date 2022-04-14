import React from "react";
import App from "App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from "apollo-upload-client";
import { AuthProvider } from "contexts/auth";
import { setContext } from "apollo-link-context";

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});
// authLink.concat(HttpLink)
// link: authLink.concat(uploadLink),

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
