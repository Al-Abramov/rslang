//alias
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Api } from "./api/api";

const rootElement = document.getElementById("app");

export const api = new Api();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
		  <App />
		</Provider>		  
	</React.StrictMode>,
	rootElement
);
