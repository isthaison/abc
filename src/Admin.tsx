import React, { useEffect, useState } from "react";

import DataGrid, {
  Column,
  Editing,
  MasterDetail,
  Paging,
} from "devextreme-react/data-grid";

import { db } from "./db";

export function Admin() {
  const [questions, _questions] = useState<object[]>([]);
  useEffect(() => init(), []);

  const init = () => {
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM questions", [], function (tx, { rows }) {
        const s: object[] = [];

        for (let i = 0; i < rows.length; i++) {
          s.push(rows.item(i));
        }

        _questions(s);
      });
    });
  };

  function onRowInserted({ data }: any) {
    console.log(data);

    db.transaction(
      function (tx) {
        tx.executeSql(
          "INSERT INTO questions (id, question ,groupseq, isDone, img) VALUES (?,? ,?, 0,?)",
          [data["id"], data["question"], data["groupseq"], data["img"] || ""]
        );
      },
      (e) => {
        console.log(e);
      }
    );
  }

  function onRowUpdated({ data }: any) {
    console.log(data);
    db.transaction(
      function (tx) {
        tx.executeSql(
          "update questions set question=?,groupseq=?,img=? ,isDone=?  where id = ?",
          [
            data["question"],
            data["groupseq"],
            data["img"] || "",
            data["isDone"] ? 1 : 0,
            data["id"],
          ]
        );
      },
      (e) => {
        console.log(e);
      }
    );
  }

  function onRowRemoved({ data }: any) {
    console.log(data);
    db.transaction(
      function (tx) {
        tx.executeSql("delete from questions where id=?", [data["id"]]);
      },
      (e) => {
        console.log(e);
      }
    );
  }
  return (
    <>
      <h2>Admin</h2>
      <DataGrid
        id="grid-container"
        dataSource={questions}
        keyExpr="id"
        showBorders={true}
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
      >
        <Paging enabled={true} />
        <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="question" />
        <Column dataField="groupseq" caption="Group" />
        <Column dataField="img" caption="Image" />
        <Column dataField="isDone" dataType="boolean"></Column>

        <MasterDetail enabled={true} component={DetailTemplate} />
      </DataGrid>
    </>
  );
}

export function DetailTemplate(props: any) {
  const [answers, _answers] = useState<object[]>([]);
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    console.log(props.data);

    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM answers where questionid =?",
        [props.data.data["id"]],
        function (tx, { rows }) {
          console.log(rows);

          const s: object[] = [];

          for (let i = 0; i < rows.length; i++) {
            s.push(rows.item(i));
          }

          _answers(s);
        }
      );
    });
  };

  function onRowInserted({ data }: any) {
    console.log(data);

    db.transaction(
      function (tx) {
        tx.executeSql(
          "INSERT INTO answers (id,  questionid ,answers,result,img) VALUES (?, ?,?, ?,?)",
          [
            data["id"],
            props.data.data["id"],
            data["answers"],
            data["result"] ? 1 : 0,
            data["img"] || "",
          ]
        );
      },
      (e) => {
        console.log(e);
      }
    );
  }

  function onRowUpdated({ data }: any) {
    console.log(data);
    db.transaction(
      function (tx) {
        tx.executeSql(
          "update answers set answers=?,img=? result=? where id = ?",
          [
            data["answers"],
            data["result"] ? 1 : 0,
            data["id"],
            data["img"] || "",
          ]
        );
      },
      (e) => {
        console.log(e);
      }
    );
  }

  function onRowRemoved({ data }: any) {
    console.log(data);
    db.transaction(
      function (tx) {
        tx.executeSql("delete from answers where id=?", [data["id"]]);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  return (
    <React.Fragment>
      <DataGrid
        dataSource={answers}
        showBorders={true}
        columnAutoWidth={true}
        keyExpr="id"
        onRowInserted={onRowInserted}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
      >
        <Paging enabled={true} />
        <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="answers" />
        <Column dataField="img" />
        <Column dataField="result" dataType="boolean"></Column>
      </DataGrid>
    </React.Fragment>
  );
}
