import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import theme from "./theme";
import Routes from "./routes";
import "antd/dist/antd.css";

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
