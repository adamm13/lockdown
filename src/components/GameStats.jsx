import React from "react";

export default function GameStats(props) {

	return (
		<ul className="gameStats">
			<li>Samples: {props.samples}</li>
			<li>Zombie Kills:</li>
			<li>Score:</li>
		</ul>
	);
	
}