import { IStudent } from "../../types";

interface IState {
  studentsList: IStudent[];
  filteredList: IStudent[];
  totalAbsents: number;
}

interface Action {
  type: string;
  payload?: any;
}


const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "SET_STUDENTS_LIST":
      return {
        ...state,
        studentsList: action.payload,
        filteredList: action.payload,
      };
    case "SET_FILTERED_LIST":
      return { ...state, filteredList: action.payload };
    case "SET_TOTAL_ABSENTS":
      return { ...state, totalAbsents: action.payload };
    case "REMOVE_FIRST":
      return { ...state, studentsList: state.studentsList.slice(1) };
    case "HANDLE_ABSENT_CHANGE":
      return {
        ...state,
        totalAbsents: state.totalAbsents + action.payload.change,
        studentsList: state.studentsList.map((std) =>
          std.id === action.payload.id
            ? { ...std, absents: std.absents + action.payload.change }
            : std
        ),
      };
    case "ADD_STUDENT":
      return {
        ...state,
        studentsList: [action.payload, ...state.studentsList],
      };
    default:
      return state;
  }
};

export default reducer;