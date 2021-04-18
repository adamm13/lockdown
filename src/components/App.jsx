import React from "react";
import Controls from './Controls.jsx';

export default class App extends React.Component {
	render() 
	{
		const titleStyle = {
		  color: "red",
      // backgroundColor: "black",
      padding: "5px",
      fontFamily: "Courier",
			textAlign: "center"
    };
		return (
			<>
				<Controls />
			</>
		);
	}
}
