import React, {useState, useEffect} from "react";
import sceneEvents from "../phaser/SceneEvents";

export default function GameStats(props) {
	const [inventory, setInventory] = useState(0);
	const [killCount, setKillCount] = useState(0);
	const [timer, setTimer] = useState('00:00');
	const [danger, setDanger] = useState(0);

	useEffect(() => {

		sceneEvents.on('sample-collected', (playerInventory) => {		
			setInventory(playerInventory.length);
		});

		sceneEvents.on('zombie-killed', (playerKills) => {
			setKillCount(playerKills);
		});

		sceneEvents.on('player-death', (data) => {
			setInventory(data.inventory.length);
			setKillCount(data.kills);
			setTimer('00:00');
		});

		sceneEvents.on('reset-score', (data) => {
			setInventory(0);
			setKillCount(0);
			setTimer('00:00');
		});

		sceneEvents.on('timer', (timer, danger)=>{
			setDanger(danger);
			setTimer(timer);
		});

	}, []);
	if (danger === true){
		return (
			<ul className="gameStats">
				<li className="danger">Timer: {timer}</li>
				<li>Zombie Kills: {killCount}</li>
				<li>Score: {(inventory * 100) + (killCount * 500)} </li>
			</ul>
		);
	} else {
		return (
			<ul className="gameStats">
				<li>Timer: {timer}</li>
				<li>Zombie Kills: {killCount}</li>
				<li>Score: {(inventory * 100) + (killCount * 500)} </li>
			</ul>
		);
	}
	
}