import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";

import { db } from "./db";
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

type SquareProps = {
  onClick?: (x: number, y: number) => void;
  onDoubleClick?: (x: number, y: number) => void;
  team: number;
  x: number;
  y: number;
  value: string;
  onDrop?: (e: any) => void;
  onDragOver?: (e: any) => void;
};
type useDoubleClickProps = {
  ref: any;
  latency: number;
  onSingleClick?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
};
const useDoubleClick = ({
  ref,
  latency = 300,
  onSingleClick = () => null,
  onDoubleClick = () => null,
}: useDoubleClickProps) => {
  useEffect(() => {
    const clickRef = ref.current;
    let clickCount = 0;
    const handleClick = (e: any) => {
      clickCount += 1;

      setTimeout(() => {
        if (clickCount === 1) onSingleClick(e);
        else if (clickCount === 2) onDoubleClick(e);

        clickCount = 0;
      }, latency);
    };

    // Add event listener for click events
    clickRef.addEventListener("click", handleClick);

    // Remove event listener
    return () => {
      clickRef.removeEventListener("click", handleClick);
    };
  });
};

function Square(props: SquareProps) {
  const buttonRef = useRef<any>();

  useDoubleClick({
    /** A callback function for single click events */
    onSingleClick: (e: any) => onClick(),
    /** A callback function for double click events */
    onDoubleClick: (e: any) => onDoubleClick(),
    /** (Required) Dom node to watch for double clicks */
    ref: buttonRef,
    /**
     * The amount of time (in milliseconds) to wait
     * before differentiating a single from a double click
     */
    latency: 350,
  });
  function onDoubleClick() {
    props.team === -1 &&
      props.onDoubleClick &&
      props.onDoubleClick(props.x, props.y);
  }

  function onClick() {
    props.team === -1 && props.onClick && props.onClick(props.x, props.y);
  }

  return (
    <button
      onDrop={props.onDrop}
      onDragOver={props.onDragOver}
      ref={buttonRef}
      style={{ background: list_color[props.team] }}
      className="square"
      data-x={props.x}
      data-y={props.y}
      data-team={props.team}
    >
      {props.value}
      {/* {`${props.x}` === `3` && `${props.y}` === `3` && <span>🎁</span>} */}
    </button>
  );
}

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

  const [showmodalquestion, _showmodalquestion] = useState<boolean>(false);

  const handleClick = (x: number, y: number) => {
    _showmodalquestion(true);
  };
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
    db.transaction(
      function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS questions (id text PRIMARY KEY, question text, groupseq text, isDone boolean, img  text )"
        );
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS answers (id text PRIMARY KEY, questionid text,answers text, result boolean, img  text )"
        );
      },
      (e) => {
        console.log(e);
      }
    );
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM questions", [], function (tx, results) {
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
    _valueteamname("");
  };

  function dragging(event: any) {}

  function dragStart(event: any) {
    event.dataTransfer.setData("Text", event.target.id);
  }
  const [teamselecting, _teamselecting] = useState<number>(-1);
  const [sqselecting, _sqselecting] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  const [groupquestion, _groupquestion] = useState<string>("");

  const [questionselecting, _questionselecting] = useState<any>(null);

  const [answersselecting, _answersselecting] = useState<any[]>([]);

  useEffect(() => {
    if (questionselecting) {
      GetAnswers(questionselecting);
    }
  }, [questionselecting]);

  function GetQuestion() {
    db.transaction(
      function (tx) {
        tx.executeSql(
          `SELECT * FROM questions where groupseq=? and isDone != 1`,
          [groupquestion],
          function (tx, { rows }) {
            console.log({ rows });

            if (rows.length === 0) {
              _questionselecting(null);
            } else {
              _questionselecting(rows.item(0));
            }
          }
        );
      },
      (e) => {
        console.log(e);
        _questionselecting(null);
      }
    );
  }

  function GetAnswers(a: any) {
    db.transaction(function (tx) {
      tx.executeSql(
        `SELECT * FROM answers where questionid=?`,
        [a["id"]],
        function (tx, { rows }) {
          const s: object[] = [];
          console.log(rows);

          for (let i = 0; i < rows.length; i++) {
            s.push(rows.item(i));
          }

          _answersselecting(s);
        }
      );
    });
  }

  function drop(event: any) {
    event.preventDefault();
    const data = event.dataTransfer.getData("Text");

    const el: any = document.getElementById(data);

    const datasetel = el.dataset;
    console.log({ datasetel });

    const { dataset } = event.target;

    if (dataset["team"] === "-1") {
      _teamselecting(parseInt(datasetel["team"]));
      _sqselecting({
        x: parseInt(dataset["x"]),
        y: parseInt(dataset["y"]),
      });
      GetQuestion();
      _showmodalquestion(true);
    }
  }
  function allowDrop(event: any) {
    event.preventDefault();
  }

  function AnsweronTrue() {
    window.alert(questionselecting["id"]);
    questionselecting &&
      db.transaction(
        function (tx) {
          tx.executeSql("update questions set isDone=1 where id = ?", [
            questionselecting["id"],
          ]);
        },
        (e) => {
          console.log(e);
        }
      );


    if (teamselecting != null && sqselecting != null) {
      console.log({
        teamselecting,
        sqselecting,
      });

      let m: number[][] = JSON.parse(JSON.stringify(matrix));

      m[sqselecting.x][sqselecting.y] = teamselecting;

      _matrix(m);
    }

    _showmodalquestion(false)
  }

  return (
    <>
      <div className="game">
        <div className="game-info">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {listteam.map((e, i) => (
              <span
                onDragStart={dragStart}
                onDrag={dragging}
                draggable="true"
                style={{
                  background: list_color[i],
                  margin: "1px",
                  fontSize: "2rem",
                }}
                key={`${e.name}${i}`}
                id={`${e.name}${i}`}
                data-team={`${i}`}
              >
                <b>{e.name}</b>
              </span>
            ))}
          </div>
        </div>
        <p>Đường đi phải lớn hơn bằng 6 ô</p>

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
                  onDrop={drop}
                  onDragOver={allowDrop}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <input
        value={groupquestion}
        onChange={({ target }) => _groupquestion(target.value)}
      />

      <Modal show={modalteam.v} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo đội mới nè ^ ^ </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text! (
          {`${list_char[modalteam.x]}${modalteam.y + 1}`})
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

      <Modal show={showmodalquestion} onHide={() => _showmodalquestion(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Trả lời câu hỏi nè ^ ^ ({listteam[teamselecting]?.name}) [
            {`${list_char[sqselecting.x]}${sqselecting.y + 1}`}]
          </Modal.Title>
        </Modal.Header>
        {questionselecting && (
          <Modal.Body>
            <h3>{questionselecting && questionselecting["question"]}</h3>
            {answersselecting.map((ef, i) => (
              <Answer onTrue={AnsweronTrue} key={ef["id"]} data={ef} i={i} />
            ))}
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => _showmodalquestion(false)}>
            Đóng lại đi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// ========================================

type AnswerProps = {
  data: any;
  onTrue: () => void;
  i: number;
};

function Answer({ data, onTrue, i }: AnswerProps) {
  const [showresult, _showresult] = useState<boolean>(false);

  function onClick() {
    _showresult(true);
  }

  function onClickTrue() {
    console.log(data);

    if (data["result"] === 1) {
      onTrue();
    }
  }

  return (
    <h4 onClick={onClick}>
      {showresult && (
        <span
          onClick={onClickTrue}
          style={{
            color: data["result"] === 1 ? "green" : "red",
            fontSize: "2rem",
          }}
        >
          {data["result"] === 1 ? `❎` : "❌"}
        </span>
      )}
      ({list_char[i]}) {data["answers"]}
    </h4>
  );
}
