import { useEffect, useReducer, useRef } from "react";
import { IStudent } from "../../types";
import CoursesList from "../courses-list/courses-list.component";
import "./student.css";
import { Link } from "react-router-dom";

interface IProps extends IStudent {
  onAbsentChange: (id: string, change: number) => void;
}

type State = {
  absents: number;
  absentColor: string;
};

type Action =
  | { type: "ADD_ABSENT" }
  | { type: "REMOVE_ABSENT" }
  | { type: "RESET_ABSENT" }
  | { type: "SET_COLOR"; color: string };

const initialState: State = {
  absents: 0,
  absentColor: "#213547",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ABSENT":
      return { ...state, absents: state.absents + 1 };
    case "REMOVE_ABSENT":
      return { ...state, absents: Math.max(state.absents - 1, 0) };
    case "RESET_ABSENT":
      return { ...state, absents: 0 };
    case "SET_COLOR":
      return { ...state, absentColor: action.color };
    default:
      return state;
  }
};

const Student = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    absents: props.absents,
  });
  const prevAbsents = useRef<number>(props.absents);

  useEffect(() => {
    let color = "#213547";
    if (state.absents >= 10) {
      color = "#ff0000";
    } else if (state.absents >= 7) {
      color = "#fd9c0e";
    } else if (state.absents >= 5) {
      color = "#d6c728";
    }
    dispatch({ type: "SET_COLOR", color });
  }, [state.absents]);

  const addAbsent = () => {
    prevAbsents.current = state.absents;
    dispatch({ type: "ADD_ABSENT" });
    props.onAbsentChange(props.id, +1);
  };

  const removeAbsent = () => {
    if (state.absents - 1 >= 0) {
      prevAbsents.current = state.absents;
      dispatch({ type: "REMOVE_ABSENT" });
      props.onAbsentChange(props.id, -1);
    }
  };

  const resetAbsent = () => {
    prevAbsents.current = state.absents;
    dispatch({ type: "RESET_ABSENT" });
    props.onAbsentChange(props.id, -state.absents);
  };

  return (
    <div className="std-wrapper">
      <div className="data-field">
        <b>Student:</b>{" "}
        <Link to={`/student/${props.id}`}>
          {props.name.toUpperCase() + "!"}
        </Link>
      </div>
      <div className="data-field">
        <b>Age:</b> {props.age}
      </div>
      <div
        className="data-field"
        style={{ color: props.isGraduated ? "green" : "orange" }}
      >
        <b>Is Graduated:</b> {props.isGraduated ? "Yes" : "No"}
      </div>
      <div className="data-field">
        <b>Courses List:</b>
        <CoursesList list={props.coursesList} />
      </div>
      <div className="absents">
        <b style={{ color: state.absentColor }}>Prev Absents:</b>{" "}
        {prevAbsents.current}
        <b style={{ color: state.absentColor }}>Absents:</b> {state.absents}
        <button onClick={addAbsent}>+</button>
        <button onClick={removeAbsent}>-</button>
        <button onClick={resetAbsent}>Reset</button>
      </div>
    </div>
  );
};

export default Student;
