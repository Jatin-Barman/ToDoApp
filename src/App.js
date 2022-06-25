import React, { useEffect, useState } from "react";
import "./App.css";

//get the data from local storage
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function App() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //Add the items function
  const addItem = () => {
    if (!inputData) {
      alert("Please add items...");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //Edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //Delete items one by one
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //Remove all the items (Checklist)
  const removeAll = () => {
    setItems([]);
  };

  //Adding local Storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    // syntactic sugar format
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo logo"></img>
            <figcaption>TO DO LIST</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍🏻 Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleButton ? (
              <i className="far fa-solid fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-solid fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-solid fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          textAlign: "center",
          color: "white",
        }}
      >
        © 2022 Copyright: Jatin-Barman .<b>🇮🇳</b>
      </div>
    </>
  );
}

export default App;
