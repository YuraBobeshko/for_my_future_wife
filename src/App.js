import React, { useState } from 'react';
import { connect } from "react-redux";
import './App.css';

function App (props) {
  const [name, setName] = useState("");
  const [nameN, setNameN] = useState("");
  const {food, onSelect, onDown, onUp, changing, setNewName, createName} = props;
  return (
    <div className="App">
        <input
          onKeyPress={event => event.key === "Enter" ? createName(nameN) : ""} 
          className="input"
          autoFocus={true}
          onBlur={() => createName(nameN)}
          type="text"
          onChange={event => setNameN(event.target.value)}
          defaultValue={nameN}
          placeholder="Добавить качество Лены "
        ></input>
      {food.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <label
              className={`list-group-item ${
                item.selected ? "active" : ""
              }`}
              onDoubleClick={() => changing(item.id)}
              hidden={item.changing}
            >
              <input
                hidden={true}
                onChange={() => onSelect(item.id)}
                type="checkbox"
              ></input>
              <p hidden={item.changing}>
                {index+1})&ensp;&ensp;&ensp;{item.name}
              </p>
            </label>
            <input
              className="input"
              autoFocus={true}
              onBlur={() => setNewName(item.id, name || item.name)}
              key={item.id + "text"}
              hidden={!item.changing}
              type="text"
              onChange={event => setName(event.target.value)}
              defaultValue={item.name}
            ></input>
          </React.Fragment>
        );
      })}
      <div className="btn-group">
        <button
          className="btn btn-primary"
          disabled={food[0].selected}
          onClick={onUp}
        >
          onUp
        </button>
        <button
          className="btn btn-primary"
          disabled={food[food.length-1].selected}
          onClick={onDown}
        >
          onDown
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    food: state.food
  }
}

const ItemUp = "MOVE_ITEM_UP";
const ItemDown = "MOVE_ITEM_DOWN";
const Select = "SELECT";
const unSelected = "UNSELECTED";
const changing = "CHANGING";
const setNewName = "SET_NAME";
const createName = "CREATE_NAME";

function mapDispathToProps(dispath) {
  return {
    onUp: id => dispath({type: ItemUp, payload: id}),
    onDown: id => dispath({type: ItemDown, payload: id}),
    onSelect: number => dispath({type: Select, payload: number}),
    unSelected: () => dispath({type: unSelected}),
    changing: number => dispath({type: changing, payload: number}),
    setNewName: (id, name) => dispath({type: setNewName, payload: {id, name}}),
    createName: (name, event) => dispath({type: createName, payload: name, event}),
  } 
}

export default connect(mapStateToProps, mapDispathToProps)(App);
