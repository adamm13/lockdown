import React, {useState} from "react";
import Phaser from 'phaser';
import { transferState } from "../phaser/helpers/dataHelpers"
import sceneEvents from "../phaser/SceneEvents";
import Controls from './Controls.jsx';
import GameStats from "./GameStats.jsx";
import Background from "./Background.jsx";


export default function App(props) {
	// const gameState = transferState(); 
	const [inventory, setInventory] = useState(0);
	
	// console.log("game data from React! ", inventory);

	sceneEvents.on('sample-collected', (playerInventory) => {
		console.log("FROM REACT APP:", playerInventory);
		setInventory(playerInventory.length);
	})

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
			<GameStats samples={inventory} />
			<Background />
		</div>
	);

}
