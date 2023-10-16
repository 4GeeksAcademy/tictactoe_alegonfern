import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, fa0 } from "@fortawesome/free-solid-svg-icons";

//create your first component
const TicTacToe = ({ goGame, setPlayers }) => {
  const styleButtonX = {
    height: "100px",
    width: "100px",
    background: "#35322D",
    color: "#FFE666",
    fontSize: "50px",
  };
  const styleButton0 = {
    height: "100px",
    width: "100px",
    background: "#35322D",
    color: "#86CDFF",
    fontSize: "50px",
  };
  const CardStyle = {
    background: "#47433C",
    margin: "auto",
    marginTop: "100px",
  };
  // definicion de variables y estados
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Select, setplayer1Select] = useState("");

  // funciones
  const handleGoGame = (e) => {
    e.preventDefault();
    if (
      (player1 !== "" && player2 !== "" && player1Select === "X") ||
      player1Select === "0"
    ) {
      setPlayers([
        {
          name: player1,
          as: player1Select,
        },
        {
          name: player2,
          as: player1Select === "X" ? "0" : "X",
        },
      ]);
      goGame("Game");
      return console.log("se puede pasar");
    }
    console.log("ERROR, DEBE DE LLENAR BIEN TODO");
  };
  return (
    <div className="row d-flex flex-row justify-content-center mt-2">
      <h2 className="text-white text-center">Pick a Weapon</h2>
      <div className="col-8 p-2 py-4" style={CardStyle}>
        <div className="row">
          <form className="col-6  m-auto" onSubmit={handleGoGame}>
            <div className="row mb-2">
              <div className="col-12">
                <h1 className="text-white">Choose your Weapon</h1>
              </div>
            </div>
            <div className="row bg-danger ">
              <div className="col-12 m-0 p-0">
                <input
                  className="w-50"
                  type="text"
                  name=""
                  id=""
                  value={player1}
                  placeholder="Name Player1"
                  onChange={(e) => setPlayer1(e.target.value)}
                />
                <input
                  className="w-50"
                  type="text"
                  name=""
                  id=""
                  value={player2}
                  placeholder="Name Player2"
                  onChange={(e) => setPlayer2(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-8 m-auto d-flex flex-row justify-content-around">
                <input
                  className="border border-0 "
                  style={styleButtonX}
                  onClick={() => setplayer1Select("X")}
                  type="submit"
                  value="X"
                />
                <input
                  className="border border-0 "
                  style={styleButton0}
                  onClick={() => setplayer1Select("0")}
                  type="submit"
                  value="0"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
