import React, { useState } from "react";

const SimpleCalculator = () => {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      const result = eval(display);
      setDisplay(result.toString());

      // Agregar cálculo al historial
      setHistory((prevHistory) => [...prevHistory, { calculation: `${display} = ${result}`, id: Date.now() }]);
    } catch (error) {
      alert("Expresión inválida");
    }
  };

  const handleDelete = (id) => {
    setHistory((prevHistory) => prevHistory.filter(item => item.id !== id));
  };

  const createButton = (value, onClick = handleClick) => (
    <button onClick={() => onClick(value)}>{value}</button>
  );

  return (
    <div className="simple-calculator">
      <h3>Calculadora 🧮</h3>
      <input
        type="text"
        value={display}
        onChange={(e) => setDisplay(e.target.value)}
        readOnly
      />
      <div className="button-grid">
        {createButton("7")}
        {createButton("8")}
        {createButton("9")}
        {createButton("/", () => handleClick("/"))}
        {createButton("4")}
        {createButton("5")}
        {createButton("6")}
        {createButton("*", () => handleClick("*"))}
        {createButton("1")}
        {createButton("2")}
        {createButton("3")}
        {createButton("-", () => handleClick("-"))}
        {createButton("0")}
        {createButton(".")}
        {createButton("C", handleClear)}
        {createButton("+", () => handleClick("+"))}
      </div>
      <button onClick={handleCalculate} className="add-button calculate-button">
        Calcular
      </button>
      <div className="history">
        <h3>Historial de cálculos</h3>
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              {item.calculation}
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SimpleCalculator;
