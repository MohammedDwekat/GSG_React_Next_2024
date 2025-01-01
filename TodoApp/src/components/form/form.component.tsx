import { ITodoItem } from "../types";
import "./form.css";

interface Iprops {
  onSubmit: (item: ITodoItem) => void;
}

const Form = (props: Iprops) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title: string = e.currentTarget["task"].value;
    const isUrgent: boolean = e.currentTarget["task"].checked;

    if (title.length > 3) {
      const newTask: ITodoItem = {
        id: Date.now(),
        title,
        isUrgent,
        isDone: false,
      };

      props.onSubmit(newTask);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" name="task" placeholder="Type todo hrere " />

      <div>
        <label htmlFor="urgent">Urgent</label>
        <input type="checkbox" id="urgent" />
      </div>
      <input type="submit" value="Add Todo" />
    </form>
  );
};

export default Form;
