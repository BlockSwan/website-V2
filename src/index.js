import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const APP_ID = "SJ3XaPUatEHsLW1txCV6tnVnz84hdAA96sV3FQqA";
const SERVER_URL = "https://wtjf6rurajha.usemoralis.com:2053/serverr";
const Application = () => {
	const isServerInfo = APP_ID && SERVER_URL ? true : false;

	//SERVER INFO TRUE
	if (!APP_ID || !SERVER_URL) throw new Error("Missing web3 integration");
	if (isServerInfo)
		return (
			<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
				<App isServerInfo />
			</MoralisProvider>
		);
	else {
		return (
			<div>
				<p>Fail</p>
			</div>
		);
	}
};

ReactDOM.render(<Application />, document.getElementById("root"));
