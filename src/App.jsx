import { BsFillSunFill, BsFillMoonFill, BsFillTrashFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { useState, useEffect } from "react";
import { useDarkMode } from "./context/DarkModecontext";

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || [
      { title: "로컬 스토리지를 지원합니다.", isChecked: false, id: "0" },
    ]
  );
  const [show, setShow] = useState(0);
  const [add, setAdd] = useState("");
  const [holder, setHolder] = useState("Add Todo");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const filtered = getFilteredItems(list, show);

  const handleCheckboxChange = (id) => {
    let copy = [...list];
    let index = copy.findIndex((item) => item.id === id);
    copy[index].isChecked = !copy[index].isChecked;
    setList(copy);
  };

  return (
    <div className="App">
      <div className="to-do-app">
        <div id="navBar">
          <button className="dark_mode_btn btn" onClick={toggleDarkMode}>
            {!darkMode && <BsFillMoonFill />}
            {darkMode && <BsFillSunFill />}
          </button>
          <div>
            <button
              className="nav_btn btn"
              onClick={() => {
                setShow(0);
              }}
            >
              All
            </button>
            <button
              className="nav_btn btn"
              onClick={() => {
                setShow(1);
              }}
            >
              Active
            </button>
            <button
              className="nav_btn btn"
              onClick={() => {
                setShow(2);
              }}
            >
              Completed
            </button>
          </div>
        </div>
        <div id="lists">
          {filtered.map((e, i) => {
            return (
              <div className="list" key={i}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={e.isChecked}
                  onChange={() => handleCheckboxChange(e.id)}
                />
                {e.title}
                <button
                  className="del_btn"
                  onClick={() => {
                    let copy = [...list];
                    let index = copy.findIndex((item) => item.id === e.id);
                    copy.splice(index, 1);
                    setList(copy);
                  }}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div id="addBar">
            <input
              type="text"
              maxLength="16"
              placeholder={holder}
              className="input_todo"
              value={add}
              onChange={(e) => {
                setAdd(e.target.value);
              }}
            />
            <button
              className="add_btn"
              onClick={() => {
                let copy = [...list];
                if (!copy.find((e) => e.title === `${add}`) && add.length > 0) {
                  copy.push({
                    title: `${add}`,
                    isChecked: false,
                    id: uuidv4(),
                  });
                  setList(copy);
                  setAdd("");
                } else if (add.length === 0) {
                  setHolder("한 글자 이상 입력해주세요.");
                } else {
                  setAdd("");
                  setHolder("이미 존재하는 목록입니다.");
                }
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getFilteredItems(list, show) {
  if (show === 0) {
    return list;
  } else if (show === 1) {
    return list.filter((e) => e.isChecked === false);
  } else {
    return list.filter((e) => e.isChecked === true);
  }
}

export default App;
