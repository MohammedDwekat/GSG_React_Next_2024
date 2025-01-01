import { ITodoItem } from "../types";
import "./dashboard.css";

interface Iprops {
  items: ITodoItem[];
}

const Dashboard = (props: Iprops) => {
  const UrgentItems: number = props.items.filter(
    (item) => item.isUrgent
  ).length;
  const DoneItems: number = props.items.filter((item) => item.isDone).length;

  return (
    <div className="dashboard">
      <div>
        <b>{props.items.length}</b>
        <span>Created Tasks</span>
      </div>
      <div>
        <b>{UrgentItems}</b>
        <span>Urgent Tasks</span>
      </div>
      <div>
        <b>{DoneItems}</b>
        <span>Completed Tasks</span>
      </div>
    </div>
  );
};

export default Dashboard;
