import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [randomTask, setRandomTask] = useState({});
  const [specialTask, setSpecialTask] = useState({});
  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const [isSpecialLoading, setIsSpecialLoading] = useState(false);
  const [rangeValue, setRangeValue] = useState(5);
  const [isTypeError, setIsTypeError] = useState(false);
  const [type, setType] = useState("");

  const getRandom = () => {
    setRandomTask({});
    setIsRandomLoading(true);
    axios
      .get("http://www.boredapi.com/api/activity")
      .then((response) => {
        setRandomTask(response.data);
        setIsRandomLoading(false);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getSpecial = () => {
    if (!type) setIsTypeError(true);
    else if (type) {
      setSpecialTask({});
      setIsSpecialLoading(true);
      setIsTypeError(false);
      const accessibility = rangeValue / 10;
      axios
        .get(
          `http://www.boredapi.com/api/activity?accessibility=${accessibility}&type=${type}`
        )
        .then((response) => {
          setIsSpecialLoading(false);
          setSpecialTask(response.data);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const selected = () => {
    var select = document.querySelector(".type");
    var typeValue = select.options[select.selectedIndex].value;
    setType(typeValue);
  };

  const slider = (value) => {
    const slider = document.querySelector(".slider");
    slider.innerHTML = value;
    setRangeValue(value);
  };

  return (
    <div className="App">
      <h1>bored?</h1>

      <div className="block-1">
        <h2>get a random task to do</h2>
        <button onClick={getRandom}>Get A Task</button>
        {isRandomLoading && <p>Loading...</p>}
        {randomTask && <p>{randomTask?.activity}</p>}
      </div>

      <h3>OR</h3>

      <div className="block-2">
        <h2>set parameters for a Task</h2>
        <select className="type" onChange={selected}>
          <option value="">Type</option>
          <option value="education">education</option>
          <option value="recreational">recreational</option>
          <option value="social">social</option>
          <option value="diy">diy</option>
          <option value="charity">charity</option>
          <option value="cooking">cooking</option>
          <option value="relaxation">relaxation</option>
          <option value="music">music</option>
          <option value="busywork">busywork</option>
        </select>
        {isTypeError && <span className="error">select a type</span>}

        <div className="accessibility">
          <label>
            accessibility level
            <input
              className="slider"
              type="range"
              min="0"
              max="10"
              defaultValue="5"
              onChange={(e) => slider(e.target.value)}
            />
            {rangeValue}
          </label>
        </div>

        <button onClick={getSpecial}>Get A Task</button>
        {isSpecialLoading && <p>Loading...</p>}
        {specialTask && (
          <p>
            {specialTask?.activity ? specialTask?.activity : specialTask?.error}
          </p>
        )}
      </div>
    </div>
  );
}
