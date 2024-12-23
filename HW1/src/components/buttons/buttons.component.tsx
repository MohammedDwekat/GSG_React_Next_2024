import { useState } from "react";
import "./buttons.css";
interface IProps {
  type: string;
  id: string;
  name: string;
  value: string;
  OnGetInput: (value: string, type: string) => void;
}

const Buttons = (props: IProps) => {
  const [value, setValue] = useState(null);

  const setInputValue = () => {
    setValue(value);
    props.OnGetInput(props.value, props.type);
  };

  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onClick={setInputValue}
        //  props.OnGetInput(props.value, props.type)
      />
    </div>
  );
};

export default Buttons;
