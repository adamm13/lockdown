import React, {useState, useEffect} from "react";
import sceneEvents from "../phaser/SceneEvents";

export default function GameStats(props) {
	const [inventory, setInventory] = useState(0);
	const [killCount, setKillCount] = useState(0);

	useEffect(() => {

		sceneEvents.on('sample-collected', (playerInventory) => {		
			setInventory(playerInventory.length);
		});

		sceneEvents.on('zombie-killed', (playerKills) => {
			setKillCount(playerKills);
		});

	}, []);

	return (
		<ul className="gameStats">
			<li>Samples: {inventory}</li>
			<li>Zombie Kills: {killCount}</li>
			<li>Score: {(inventory * 100) + (killCount * 500)} </li>
		</ul>
	);
	
}