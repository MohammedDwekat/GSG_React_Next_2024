import { Trash } from "@phosphor-icons/react";
import "./todo-item.css";
import { ITodoItem } from "../types";
import React from "react";

interface Iprops {
  data: ITodoItem;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const TodoItem = ({ data, onToggle, onDelete }: Iprops) => {
  return (
    <div
      className={`item-wrapper ${data.isDone ? "done" : ""} ${
        data.isUrgent ? "urgent" : ""
      }`}
    >
      <span>
        <div>
          <input
            type="checkbox"
            id={`checkbox-${data.id}`}
            checked={data.isDone}
            onChange={onToggle}
            data-item-id={data.id}
          />
          <label htmlFor={`checkbox-${data.id}`}></label>
        </div>
        <span>{data.title}</span>
      </span>
      <Trash
        className="delete"
        size={20}
        color="#cf2020"
        weight="fill"
        onClick={onDelete}
      />
    </div>
  );
};

export default TodoItem;
