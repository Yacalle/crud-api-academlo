import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const initialForm = {
  student: "",
  task: "",
  isCompleted: false,
  id: null,
  version: 0,
};
const CrudForm = ({ createData, db, setDb, readData }) => {
  const [form, setForm] = useState(initialForm);
  const [completed, setCompleted] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.student || !form.task) {
      alert("Datos incompletos");
      return;
    }
    if (form.id === null) {
      createData(form);
      setForm(initialForm);
    }
  };
  const newRequest = async () => {
    let response = await axios({
      method: "GET",
      url: "https://todos-go.herokuapp.com/api/todos",
    });
    return response;
  };
  const handleDisplayAll = () => {
    setCompleted(false);
    setIncomplete(false);
    readData();
  };
  const handleDisplayCompleted = () => {
    setCompleted(true);
    setIncomplete(false);
    newRequest().then((res) => {
      if (res) {
        let response = res.data.todos.filter((task) => task.isCompleted);
        setDb(response);
      }
    });
  };
  const handleDisplayIncomplete = async () => {
    setIncomplete(true);
    setCompleted(false);
    newRequest().then((res) => {
      if (res) {
        let response = res.data.todos.filter((task) => !task.isCompleted);
        setDb(response);
      }
    });
  };
  useEffect(() => {
    if (completed) {
      handleDisplayCompleted();
    }
    if (incomplete) {
      handleDisplayIncomplete();
    }
  }, [db]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              className="student"
              type="text"
              name="student"
              onChange={handleChange}
              value={form.student}
              placeholder="Student"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="task"
              type="text"
              name="task"
              onChange={handleChange}
              value={form.task}
              placeholder="Task"
            />
          </label>
        </div>
        <button className="create-task" type="submit">
          Create task
        </button>
      </form>
      <button className="all" onClick={handleDisplayAll}>
        All tasks
      </button>
      <button className="completed" onClick={handleDisplayCompleted}>
        Completed
      </button>
      <button className="incomplete" onClick={handleDisplayIncomplete}>
        Incomplete
      </button>
    </div>
  );
};

export default CrudForm;
