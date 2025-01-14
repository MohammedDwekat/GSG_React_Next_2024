import { useEffect, useRef, useReducer } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import { IStudent } from "../types";
import { useSearchParams } from "react-router-dom";
import reducer from "../components/state/reducer";
interface IState {
  studentsList: IStudent[];
  filteredList: IStudent[];
  totalAbsents: number;
}

const initialState: IState = {
  studentsList: [],
  filteredList: [],
  totalAbsents: 0,
};

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastStdRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useSearchParams();

  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    const totalAbs = stdList.reduce((prev, cur) => prev + cur.absents, 0);
    dispatch({ type: "SET_TOTAL_ABSENTS", payload: totalAbs });
    dispatch({ type: "SET_STUDENTS_LIST", payload: stdList });
  }, [storedData]);

  useEffect(() => {
    const query = params.get("q") || "";
    if (query) {
      dispatch({
        type: "SET_FILTERED_LIST", // update filter in reducer
        payload: state.studentsList.filter((std) =>
          std.name.toLowerCase().includes(query.toLowerCase())
        ),
      });
    } else {
      dispatch({ type: "SET_FILTERED_LIST", payload: state.studentsList });
    }
  }, [params, state.studentsList]);

  const removeFirst = () => {
    dispatch({ type: "REMOVE_FIRST" });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "HANDLE_ABSENT_CHANGE", payload: { id, change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setParams({ q: query });
  };

  return (
    <>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className="stats">
        <button onClick={removeFirst}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: "12px", fontWeight: 100, color: "gray" }}>
          Total Absents {state.totalAbsents}
        </b>
      </div>
      <div className="filter">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={params.get("q") || ""}
        />
      </div>
      {state.filteredList.map((student) => (
        <Student
          key={student.id}
          id={student.id}
          name={student.name}
          age={student.age}
          absents={student.absents}
          isGraduated={student.isGraduated}
          coursesList={student.coursesList}
          onAbsentChange={handleAbsentChange}
        />
      ))}
      <div ref={lastStdRef}></div>
    </>
  );
};

export default Main;
