import React, { useState } from "react";

//include images into your bundle

import Logic from "./Logic";
import TicTacToe from "./TicTacToe";


//create your first component
const Home = () => {
	const [stateGame, setStateGame] = useState("Lobby")
	const [Players, setPlayers] = useState("")

	return (
		<div className="container ">
			<div className="row tittle">
				<div className="col-12">
					<h1 className="text-center mt-5 text-white">Tic Tac Toe in React.js</h1>
				</div>
			</div>
			{
				stateGame === "Lobby"? <TicTacToe goGame= {setStateGame} setPlayers={setPlayers}/> : <Logic Players={Players}/>
			}

		</div>
	);
};

export default Home;