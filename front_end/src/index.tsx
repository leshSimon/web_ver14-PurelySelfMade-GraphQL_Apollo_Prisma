import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import "./GlobalLib/Assets/fontello-d1ee74d7/css/fontello.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloConnection from "./GlobalLib/Apollo/ApolloConnection";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={ApolloConnection}>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700"
      />
    </Helmet>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
