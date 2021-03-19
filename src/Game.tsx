import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import "./Game.css";

const list_color = [
  "#ff1744",
  "#d500f9",
  "#651fff",
  "#00e676",
  "#00b0ff",
  "#ff3d00",
  "#1de9b6",
  "#76ff03",
  "#3d5afe",
  "#f50057",
  "#00e5ff",
  "#c6ff00",
  "#ffea00",
  "#2979ff",
  "#ffc400",
  "#ff9100",
];
const list_char = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
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
];
const list_team = [
  {
    name: "T1",
  },
  {
    name: "T2",
  },
  {
    name: "T3",
  },
  {
    name: "T4",
  },
  {
    name: "T5",
  },
  {
    name: "T6",
  },
  {
    name: "T7",
  },
  {
    name: "T8",
  },
];

type SquareProps = {
  onClick?: (x: number, y: number) => void;
  onDoubleClick?: (x: number, y: number) => void;
  team: number;
  x: number;
  y: number;
  value: string;
};
function Square(props: SquareProps) {
  function onClick() {
    props.onClick && props.onClick(props.x, props.y);
  }
  function onDoubleClick() {
    props.onDoubleClick && props.onDoubleClick(props.x, props.y);
  }
  return (
    <button
      style={{ background: list_color[props.team] }}
      className="square"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {props.value}
    </button>
  );
}

const db = window.openDatabase("mdb", "1.0", "TestDB", 10 * 1024 * 1024);

export function Game() {
  const [matrix, _matrix] = useState<number[][]>(
    Array(7).fill(Array(7).fill(-1))
  );
  const [modalteam, _modalteam] = useState<{
    v: boolean;
    x: number;
    y: number;
  }>({
    v: false,
    x: -1,
    y: -1,
  });

  const [listteam, _listteam] = useState<{ name: string }[]>([]);
  const [valueteamname, _valueteamname] = useState<string>("");

  const handleClick = (x: number, y: number) => {};
  const handleDoubleClick = (x: number, y: number) => {
    if (x === 0 || y === 0 || y === 6 || x === 6) {
      _modalteam({
        x,
        y,
        v: true,
      });
    }
   
  };
  useEffect(() => init(), []);

  const init = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS questions (id unique, question text)"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS answers (id unique, answers text, result boolean )"
      );

      tx.executeSql(
        'INSERT INTO questions (id, question) VALUES (1, "question 1")'
      );
      tx.executeSql(
        'INSERT INTO questions (id, question) VALUES (2, "question 2")'
      );

      tx.executeSql(
        'INSERT INTO answers (id, answers,result) VALUES (1, "answers 1", 1)'
      );
    });
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM question", [], function (tx, results) {
        console.log(results);
      });
    });
  };

  const handleClose = () => _modalteam({ v: false, x: -1, y: -1 });

  const handleInsertTeam = () => {
    const { x, y } = modalteam;

      let m: number[][] = JSON.parse(JSON.stringify(matrix));

      m[x][y] = listteam.length;
      console.log(m);

      _matrix(m);

      _listteam((prev) => [...prev, { name: valueteamname }]);

      handleClose();
      _valueteamname("")
    
  };

  return (
    <>
      <div className="game">
        <div className="game-info">
          <div style={{ display: "flex" , flexWrap:'wrap'}}>
            {listteam.map((e, i) => (
              <span
                style={{
                  background: list_color[i],
                  margin: "1px",
                  fontSize: "2rem",
                }}
                key={`${e.name}${i}`}
              >
                <b>{e.name}</b>
              </span>
            ))}
          </div>
        </div>
        <h2>Điều kiện thắng:</h2>
        <p>Đường đi phải lớn hơn 7 ô</p>

        <div className="game-board">
          {matrix.map((e, x) => (
            <div
              id={`${x}${JSON.stringify(e)}`}
              key={`${x}${JSON.stringify(e)}`}
              className="board-row"
            >
              {e.map((f, y) => (
                <Square
                  key={`${y}${JSON.stringify(f)}`}
                  x={x}
                  y={y}
                  team={matrix[x][y]}
                  value={`${list_char[x]}${y + 1}`}
                  onClick={handleClick}
                  onDoubleClick={handleDoubleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Modal show={modalteam.v} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo đội mới nè ^ ^ </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text! ({modalteam.x},{modalteam.y})
        </Modal.Body>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={valueteamname}
            onChange={({ target }) => _valueteamname(target.value)}
            placeholder="Teamname"
            aria-label="Teamname"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng lại đi
          </Button>
          <Button variant="primary" onClick={handleInsertTeam}>
            Thêm mới nè
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// ========================================

function calculateWinner(squares: object[][]) {
  return null;
}
