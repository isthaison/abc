import React, { useEffect, useState } from "react";

import DataGrid, {
  Column,
  Editing,
  MasterDetail,
  Paging,
  RequiredRule,
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
  return (
    <>
      <h2>Admin</h2>
      <DataGrid
        id="grid-container"
        dataSource={questions}
        keyExpr="id"
        showBorders={true}
      >
        <Column dataField="id" dataType="number" />
        <Column dataField="question" />
        <Column dataField="groupseq" caption="Group" />
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

  function onRowInserted(data: object) {
    console.log(data);
  }
  function onRowUpdated(data: object) {
    console.log(data);
  }

  function onRowRemoved(data: object) {
    console.log(data);
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
        <Column dataField="id" dataType="number" />
        <Column dataField="questionid" dataType="number" />
        <Column dataField="answers" />
        <Column dataField="result" dataType="boolean">
          <RequiredRule />
        </Column>
      </DataGrid>
    </React.Fragment>
  );
}
