import React from 'react'
import './Game.css';
const list_color = ['#ff1744', '#f50057', '#d500f9', '#651fff', '#3d5afe', '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#00e676', '#76ff03', '#c6ff00', '#ffea00', '#ffc400', '#ff9100', '#ff3d00']
const list_char = ['A', 'B', 'C', 'D','E','F','G','H','I','J','K']
const list_question = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]
const list_team = [
  {
    name: 'T1'
  }, {
    name: 'T2'
  }, {
    name: 'T3'
  }, {
    name: 'T4'
  }, {
    name: 'T5'
  }, {
    name: 'T6'
  }, {
    name: 'T7'
  }, {
    name: 'T8'
  },
]

type SquareState = {}
type SquareProps = {
  onClick?: (x: number, y: number) => void
  x: number,
  y: number,
  value: string
}
function Square(props: SquareProps) {
  function onClick() {
    props.onClick && props.onClick(props.x, props.y)
  }
  return (
    <button className="square" onClick={onClick}>
      {props.value}
    </button>
  );
}
type BoardState = {}

type BoardProps = {
  data: object[][]
  onClick?: (x: number, y: number) => void
}
class Board extends React.Component<BoardProps>{

  render() {
    return (
      <div>
        {this.props.data.map((e, x) =>
          <div className="board-row">
            {e.map((f, y) =>
              <Square
                x={x}
                y={y}

                value={`${list_char[x]}${y+1}`}
                onClick={this.props.onClick}
              />
            )}

          </div>
        )}

      </div>
    );
  }
}


type GameProps = {}
type GameState = {
  matrix: object[][]
}

export class Game extends React.Component<GameProps> {
  state: GameState = {
    matrix: Array(7).fill(Array(7).fill(null))

  };

  handleClick(x: number, y: number) {

  }



  render() {

    return (
      <div className="game">
        <div className="game-board">
          <Board
            data={this.state.matrix}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <ul>
            {list_team.map(e => <li>{e.name}</li>)}
          </ul>
        </div>
        <p>dieu kien thang, lon hon 9 o vuong</p>
      </div>
    );
  }
}

// ========================================


function calculateWinner(squares: object[][]) {

  return null;
}
