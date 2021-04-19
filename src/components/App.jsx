import React, {useState, useEffect} from "react";
import Phaser from 'phaser';
import { transferState } from "../phaser/helpers/dataHelpers"
import sceneEvents from "../phaser/SceneEvents";
import Controls from './Controls.jsx';
import GameStats from "./GameStats.jsx";
import Background from "./Background.jsx";


export default function App(props) {
	const [inventory, setInventory] = useState(0);
	const [killCount, setKillCount] = useState(0);

	sceneEvents.on('sample-collected', (playerInventory) => {
		console.log("FROM REACT APP:", playerInventory);
		setInventory(playerInventory.length);
	});

	sceneEvents.on('zombie-killed', (playerKills) => {
		console.log("FROM REACT APP:", playerKills);
		setKillCount(playerKills);
	});

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
			<GameStats samples={inventory} kills={killCount} />
			<Background />
		</div>
	);

}
