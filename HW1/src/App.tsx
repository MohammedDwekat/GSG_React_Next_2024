import { useState } from "react";
import "./App.css";
import Buttons from "./components/buttons/buttons.component";

const buttonValues: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", "+", "-"],
  ["="],
];

function App() {
  function calculateSimpleEquation(equation: string): number {
    return eval(equation); // Directly evaluate the equation
  }

  const [equ, setEqu] = useState("");
  const handleButtonsInput = (value: string, type: string) => {
    console.log(value + " " + type);
    setEqu(equ + value);
    console.log(equ);

    if (type == "submit") {
      console.log(setEqu(calculateSimpleEquation(equ).toString()));
    }
  };

  return (
    <div>
      <div>
        {equ}
        <p> this is react app</p>
      </div>
      <table>
        <tbody>
          {buttonValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value) => (
                <td key={value}>
                  <Buttons
                    type={value === "=" ? "submit" : "button"}
                    id={value}
                    name={value}
                    value={value}
                    OnGetInput={handleButtonsInput}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
