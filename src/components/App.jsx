import React, {useState, useEffect} from "react";
import Phaser from 'phaser';
import { transferState } from "../phaser/helpers/dataHelpers"
import sceneEvents from "../phaser/SceneEvents";
import Controls from './Controls.jsx';
import GameStats from "./GameStats.jsx";
import Background from "./Background.jsx";


export default function App(props) {


	return (
		
		<div className="gameConsole">
			<Controls />
			<GameStats />
			<Background />
		</div>
	);

}
