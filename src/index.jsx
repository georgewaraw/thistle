import { StrictMode } from "react";
import { render } from "react-dom";
import { Game } from "./Game.jsx";
import "./index.css";

render(
	<StrictMode>
		<Game />
	</StrictMode>,
	document.getElementById( "root" )
);
