import React from "react";
import Controls from './Controls.jsx';
import GameStats from "./GameStats.jsx";

export default function App(props) {

	return (
		<div className="gameConsole">
			<Controls />
			<GameStats />
		</div>
	);

}
