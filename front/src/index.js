import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Provider } from 'react-redux'
import store  from './store';
import "./components/Page/page.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </Provider>
  </HashRouter>
);
