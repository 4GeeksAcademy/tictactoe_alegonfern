import React, { useEffect, useState } from "react";

import { element } from "prop-types";

//create your first component
const Logic = ({ Players }) => {
  const initialState = [
    {
      row: "row 1",
      casillas: [
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
      ],
    },
    {
      row: "row 2",
      casillas: [
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
      ],
    },
    {
      row: "row 3",
      casillas: [
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
        { value: undefined, player: undefined },
      ],
    },
  ];
  // estado para actualizar cada vez que alguien haga click
  const [ganador, setGanador] = useState("");
  const [lugares, setLugares] = useState(initialState);
  // state para definir turnos
  const [turno, setTurnos] = useState(Players[0].as);

  const styleCard = {
    height: "450px",
  };

  const [styleWinner, setStyleWinner] = useState({});

  // funcion que me de estilos si debe de llevar un borde o no
  const borderorNot = (col, row) => {
    if (col !== 2 && row !== 2) {
      return {
        height: "150px",
        width: "33%",
        borderBottom: "1px solid white",
        borderRight: "1px solid white",
      };
    } else if (row == 2 && col !== 2) {
      return {
        height: "150px",
        width: "33%",
        borderRight: "1px solid white",
      };
    } else if (row !== 2 && col == 2) {
      return {
        height: "150px",
        width: "33%",
        borderBottom: "1px solid white",
      };
    }
  };

  // funcion que rellene la casilla si solo si esta vacia
  const RellenarCasilla = (columnIndex, rowIndex) => {
    // recorro el array solo para actualizar el valor que me interesa
    const newLugares = lugares.map((lugar, index) => {
      if (index === rowIndex) {
        const newCasillas = lugar.casillas.map((casilla, indexCasilla) => {
          if (casilla.value === undefined) {
            if (indexCasilla === columnIndex) {
              return {
                value: turno,
                player: turno,
              };
            }
          }
          return casilla;
        });

        return {
          ...lugar,
          casillas: newCasillas,
        };
      }
      return lugar;
    });

    setLugares(newLugares);
    if (turno === "X") {
      setTurnos("0");
    } else if (turno === "0") {
      setTurnos("X");
    }
  };

  useEffect(() => {
    // funcion que valide si hay un ganador o no
    lugares.map((lugar, indexRow) => {
      const RowInString =
        lugar.casillas[0].value +
        lugar.casillas[1].value +
        lugar.casillas[2].value;
      if (RowInString === "XXX") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("X");
      } else if (RowInString === "000") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("0");
      }
      // ahora lo evaluamos segun columnas
      const valueColinRow1 = lugares[0].casillas[indexRow].value;
      const valueColinRow2 = lugares[1].casillas[indexRow].value;
      const valueColinRow3 = lugares[2].casillas[indexRow].value;
      const StringCol = valueColinRow1 + valueColinRow2 + valueColinRow3;
      if (StringCol === "XXX") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("X");
      } else if (StringCol === "000") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("0");
      }
      // ahora lo final , si esta en diagonal
      //desde derecha
      const valorDiagonal1 = lugares[0].casillas[0].value;
      const valorDiagonal2 = lugares[1].casillas[1].value;
      const valorDiagonal3 = lugares[2].casillas[2].value;

      const valoresEnDiagonalDesdeDerecha =
        valorDiagonal1 + valorDiagonal2 + valorDiagonal3;

      if (valoresEnDiagonalDesdeDerecha === "XXX") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("X");
      } else if (valoresEnDiagonalDesdeDerecha === "000") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("0");
      }

      // desde izquierda
      const valorDiagonal1Inverso = lugares[0].casillas[2].value;
      const valorDiagonal2Inverso = lugares[1].casillas[1].value;
      const valorDiagonal3Inverso = lugares[2].casillas[0].value;
      const valoresEnDiagonalDesdeIzquierda =
        valorDiagonal1Inverso + valorDiagonal2Inverso + valorDiagonal3Inverso;

      if (valoresEnDiagonalDesdeIzquierda === "XXX") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("X");
      } else if (valoresEnDiagonalDesdeDerecha === "000") {
        setStyleWinner({
          pointerEvents: "none",
          opacity: "0.5",
        });
        return setGanador("0");
      }
    });
  }, [lugares]);

  const final = () => {
    setLugares(initialState);
    setTurnos(Players[0].as);
    setStyleWinner({});
    setGanador("");
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-6 m-auto d-flex flex-column align-content-center">
          <h1
            className={`text-center text-${
              ganador !== "" ? `success` : `white`
            }`}
          >
            {ganador !== ""
              ? "el ganador es " + ganador + " :D"
              : "Turn " + turno}{" "}
          </h1>
          <button className="m-auto" onClick={() => final()}>
            Start Again
          </button>
        </div>
      </div>
      <div className="row" style={styleWinner}>
        <div className="col-6 m-auto" style={styleCard}>
          {lugares.map((lugar, indexRow) => {
            return (
              <div className="row">
                {lugar.casillas.map((casilla, indexCol) => {
                  const styleCard = borderorNot(indexCol, indexRow);
                  return (
                    <div
                      onClick={() => RellenarCasilla(indexCol, indexRow)}
                      role="button"
                      className={
                        "col-4 d-flex flex-row justify-content-center align-items-center"
                      }
                      style={styleCard}
                    >
                      <h1>{casilla.value}</h1>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Logic;
