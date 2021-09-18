import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppProvider from './context/AppProvider';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"


// backend for this assignment
const backendGraphql = "http://localhost:8080/";

// Error handler system
const errorHandler = () => onError((graphqlErrors, NetworkError) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL Error:\n ${message}`)
    })
  }
  if (NetworkError && NetworkError.statusCode == 401) {

  }
})
const client = new ApolloClient({
  // link: from([errorHandler, new HttpLink({
  //   uri: backend,
  // })]),
  uri: backendGraphql,
  cache: new InMemoryCache()
});




ReactDOM.render(
  <ApolloProvider client={client}>
    <AppProvider>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </AppProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
