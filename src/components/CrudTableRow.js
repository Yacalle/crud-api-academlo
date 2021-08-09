import TodoItem from "./TodoItem";
const CrudTableRow = ({ ele, setDataToEdit, setIdDelete }) => {
  let { task, student, id, version, isCompleted } = ele;
  const handleDelete = (e) => {
    e.preventDefault();
    setIdDelete({ id, task });
  };
  const handleCheked = (e) => {
    setDataToEdit({
      student,
      task,
      isCompleted: e.target.checked,
      id,
      version,
    });
    handleBackground();
  };
  const handleBackground = () => {
    if (isCompleted) {
      return "#2BC937";
    } else {
      return "#C9CFC9";
    }
  };
  return (
    <tr>
      <td>{student}</td>
      <td>{task}</td>
      <td>
        <span
          style={{
            display: "block",
            background: handleBackground(),
            textAlign: "center",
            width: "100%",
          }}
        >
          {isCompleted ? "Completed" : "Incomplete"}
        </span>
      </td>
      <td className="container-button-item">
        <TodoItem
          id={id}
          isCompleted={isCompleted}
          handleCheked={handleCheked}
        />
        <button
          onClick={handleDelete}
          style={{
            display: "inline-block",
            width: "auto",
            height: "30px",
            background: "red",
            border: "none",
            marginLeft: ".5rem",
            borderRadius: ".3rem",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
