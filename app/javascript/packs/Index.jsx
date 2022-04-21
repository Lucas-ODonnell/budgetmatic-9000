import React from "react";
import ReactDOM from 'react-dom';
import App from "../src/App";
import { HashRouter } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<HashRouter>
				<App />
		</HashRouter>,
		document.body.appendChild(document.createElement("div")),
	);
});

