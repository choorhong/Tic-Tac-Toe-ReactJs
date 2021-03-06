import React, { Component } from "react";
import "./Board.css";

import Box from "../components/Box/Box";
import Player from "../components/Player/Player";

const initialState = {
  board: Array(9).fill(null),
  markerX: null,
  winStatus: null,
  touched: false,
  disabled: false,
  selectedRadio: null
};

class Board extends Component {
  state = { ...initialState, board: [...initialState.board] };

  choosePlayerHandler = event => {
    const selectedMarker = event.target.value;
    let isXInitialMarker;
    if (selectedMarker === "X") {
      isXInitialMarker = true;
    } else {
      isXInitialMarker = false;
    }

    this.setState({
      markerX: isXInitialMarker,
      touched: true,
      selectedRadio: selectedMarker
    });
  };

  boardCheck = marker => {
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let { board } = this.state;

    // Check for winner(marker)
    for (let i = 0; i < winningCombos.length; i++) {
      let [a, b, c] = winningCombos[i];

      if (board[a] === marker && board[b] === marker && board[c] === marker) {
        return this.setState({ winStatus: marker });
      }
    }

    // check for a DRAW game
    let res = board.every(box => {
      return box !== null;
    });
    if (res) {
      this.setState({ winStatus: "draw" });
    }
  };

  placeMarkerHandler = index => {
    let newboard = this.state.board;
    let marker;
    if (this.state.markerX) {
      marker = "X";
    } else {
      marker = "O";
    }

    if (newboard[index] == null) {
      newboard[index] = marker;

      this.boardCheck(marker);
      this.setState(prevState => {
        return {
          board: newboard,
          markerX: !prevState.markerX,
          disabled: true
        };
      });
    }
  };

  resetGameHandler = () => {
    this.setState({
      ...initialState,
      board: [...initialState.board]
    });
  };

  render() {
    // console.log(initialState);
    let { board, winStatus, touched, disabled, selectedRadio } = this.state;
    let message;

    // console.log("Board:", board);
    board = board.map((box, index) => {
      return (
        <Box
          key={index}
          click={() => this.placeMarkerHandler(index)}
          winStatus={winStatus}
          marker={box}
          touched={touched}
        />
      );
    });

    if (winStatus === "O" || winStatus === "X") {
      message = <h2> Player {winStatus} Won!</h2>;
    } else if (winStatus === "draw") {
      message = <h2>Draw Game</h2>;
    }

    return (
      <React.Fragment>
        <h1>Welcome to Tic Tac Toe.... Enjoy</h1>
        <Player
          touched={touched}
          choosePlayer={this.choosePlayerHandler}
          disabled={disabled}
          selectedRadio={selectedRadio}
        />
        <div className="Board">{board}</div>
        <div className="Message">{message}</div>
        <button className="ResetGame" onClick={this.resetGameHandler}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}

export default Board;
