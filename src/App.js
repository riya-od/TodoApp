import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";

/**
 * TODO App
 * 1. Input Form
 *    - Text Fields
 *        - Name
 *        - Description
 *    - Add Button
 *
 * 2. TODO list
 *    - Info
 *      - Name
 *      - Description
 *    - Actions
 *      - Delete
 *      - Edit
 *      - Mark as done
 */

export function InputForm({ onChange }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onChange({ name, desc });
    setName("");
    setDesc("");
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescChange(event) {
    setDesc(event.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 100px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: "10px" }} htmlFor="name">
          Name :
        </label>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <label style={{ marginRight: "10px" }} htmlFor="desc">
          Description :
        </label>
        <input
          style={{ marginRight: "20px" }}
          type="text"
          id="desc"
          value={desc}
          onChange={handleDescChange}
        />

        <button
          type="submit"
          style={{ backgroundColor: "LightGreen", color: "Black" }}
        >
          ADD
        </button>
      </form>
    </div>
  );
}

// function TodoItemChange() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         margin: "20px 100px",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <input
//           style={{ marginRight: "10px" }}
//           type="text"
//           id="name"
//           value={name}
//           onChange={handleNameChange}
//         />
//         <input
//           style={{ marginRight: "20px" }}
//           type="text"
//           id="desc"
//           value={desc}
//           onChange={handleDescChange}
//         />

//         <button
//           type="submit"
//           style={{ backgroundColor: "LightGreen", color: "Black" }}
//         >
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// }
function TodoItemEdit({ todoItem, onSubmit, index }) {
  const [name, setName] = useState(todoItem.name);
  const [desc, setDesc] = useState(todoItem.desc);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescChange(event) {
    setDesc(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, desc });
  }
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <input value={name} onChange={handleNameChange} />
      </td>
      <td>
        <input value={desc} onChange={handleDescChange} />
      </td>
      <td>
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: "lightBlue", color: "Black" }}
        >
          Done
        </button>
      </td>
    </tr>
  );
}

function TodoItemDisplay({ todoItem, handleDelete, handleEdit, index }) {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{todoItem.name}</td>
      <td>{todoItem.desc}</td>
      <td>
        <button
          onClick={handleEdit}
          style={{ backgroundColor: "lightBlue", color: "Black" }}
        >
          EDIT
        </button>
      </td>
      <td>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "Red", color: "Black" }}
        >
          DEL
        </button>
      </td>
      <td>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "Grey", color: "Black" }}
        >
          Done?
        </button>
      </td>
    </tr>
  );
}

function TodoItem({ todoItem, onDelete, index, onEdit }) {
  const [editMode, setEditMode] = useState(false);

  function handleDelete() {
    onDelete(index);
  }

  function enableEditMode() {
    setEditMode(true);
  }

  function handleEdit({ name, desc }) {
    onEdit({ name, desc, index });
    setEditMode(false);
    console.log(name, desc, index);
  }
  return editMode ? (
    <TodoItemEdit todoItem={todoItem} onSubmit={handleEdit} index={index} />
  ) : (
    <TodoItemDisplay
      todoItem={todoItem}
      handleDelete={handleDelete}
      handleEdit={enableEditMode}
      index={index}
    />
  );
}

export function TodoList({ props, onDelete, onEdit }) {
  const todoItems = props.map((item, i) => (
    <TodoItem
      key={i}
      todoItem={item}
      onDelete={onDelete}
      onEdit={onEdit}
      index={i}
    />
  ));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "40px 100px 30px",
      }}
    >
      <h3>TODO List Display</h3>

      <table cellSpacing={20}>
        <thead>
          <tr>
            <th style={{ marginRight: "100px" }}>Id</th>
            <th style={{ marginRight: "100px" }}>Name</th>
            <th style={{ marginRight: "50px" }}>Description</th>
          </tr>
        </thead>
        <tbody>{todoItems}</tbody>
      </table>
    </div>
  );
}

export function App() {
  console.log("Run");
  const [todoArray, setTodoArray] = useState([]);

  const handelNewEntry = ({ name, desc }) => {
    setTodoArray((prev) => [...prev, { name, desc }]);
  };

  const handleItemEdit = ({ index, name, desc }) => {
    setTodoArray((prev) => {
      const newArr = [...prev];
      newArr[index] = { name, desc };
      return newArr;
    });
  };
  const handleDelete = (index) => {
    //setTodoArray((prev) => prev.filter((i) => i.name !== name));
    setTodoArray((prev) => {
      const result = [...prev];
      result.splice(index, 1);
      return result;
    });
  };

  console.log(todoArray);
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <h2 style={{ textTransform: "uppercase" }}>TODO app</h2>
      </header>
      <InputForm onChange={handelNewEntry} />
      <TodoList
        onEdit={handleItemEdit}
        onDelete={handleDelete}
        props={todoArray}
      />
    </div>
  );
}
