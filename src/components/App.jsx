import React from "react";
import Controls from './Controls.jsx';
import GameStats from "./GameStats.jsx";
import Background from "./Background.jsx";

export default function App(props) {
	
	
	const titleStyle = {
		color: "red",
		// backgroundColor: "black",
		padding: "5px",
		fontFamily: "Courier",
		textAlign: "center",
	};

	return (
		
		<div className="gameConsole">
			<Controls />
			<GameStats />
			<Background />
		</div>
	);

}
