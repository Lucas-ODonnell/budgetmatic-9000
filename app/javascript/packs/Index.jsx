import React from "react";
import ReactDOM from 'react-dom';
import App from "../src/App";
import {AppProvider} from "../src/context/AppContext";
import { HashRouter } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<HashRouter>
			<AppProvider >
				<App />
			</AppProvider>
		</HashRouter>,
		document.body.appendChild(document.createElement("div")),
	);
});

