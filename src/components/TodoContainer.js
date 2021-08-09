import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/todoContainer.css";
import CreateTodo from "./CreateTodo";
import CrudForm from "./CrudForm";
import CrudTableRow from "./CrudTableRow";
const TodoContainer = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const readData = async () => {
    let response = await axios({
      method: "GET",
      url: "https://todos-go.herokuapp.com/api/todos",
    });
    if (response) {
      setDb(response.data.todos);
    }
  };
  useEffect(() => {
    readData();
  }, []);
  useEffect(() => {
    if (dataToEdit) {
      updateData(dataToEdit);
    }
  }, [dataToEdit]);
  useEffect(() => {
    if (idDelete) {
      deleteData(idDelete);
    }
  }, [idDelete]);
  const createData = async (data) => {
    const response = await axios({
      method: "POST",
      url: "https://todos-go.herokuapp.com/api/todos",
      data: data,
    });
    if (response) {
      setDb([...db, response.data]);
    }
  };
  const updateData = async (data) => {
    const response = await axios({
      method: "Put",
      url: `https://todos-go.herokuapp.com/api/todos/${data.id}`,
      data: data,
    });
    if (response) {
      let newData = db.map((ele) =>
        ele.id === response.data.id ? response.data : ele
      );
      setDb(newData);
    }
  };
  const deleteData = async (idDelete) => {
    let { id, task } = idDelete;

    let confirm = window.confirm(`Seguro que desea eliminar la task ${task}`);
    if (confirm) {
      const response = await axios({
        method: "DELETE",
        url: `https://todos-go.herokuapp.com/api/todos/${id}`,
      });
      if (response) {
        let newData = db.filter((ele) => ele.id !== id && ele);
        setDb(newData);
      }
    }
  };

  return (
    <div className="todo-conatiner">
      <CrudForm
        createData={createData}
        db={db}
        setDb={setDb}
        readData={readData}
      />
      <table>
        <thead>
          <CreateTodo />
        </thead>
        <tbody>
          {db.length !== 0 &&
            db.map((ele) => (
              <CrudTableRow
                key={ele.id}
                ele={ele}
                setDataToEdit={setDataToEdit}
                setIdDelete={setIdDelete}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoContainer;
