import React from "react";
import {createRoot} from 'react-dom/client';
import App from "../src/App";
import {AppProvider} from "../src/context/AppContext";
import { HashRouter } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById('root');
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<HashRouter>
				<AppProvider >
					<App />
				</AppProvider>
			</HashRouter>,
		</React.StrictMode>,
	);
});

