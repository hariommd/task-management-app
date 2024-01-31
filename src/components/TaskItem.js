import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../assets/styles/TaskList.css";

const TaskItem = ({ task, index, handleSelectedTask }) => {
  return (
    <Draggable
      draggableId={task.id.toString()}
      key={task.id.toString()}
      index={index}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-item">
              <div className="actions">
                <button
                  className="button"
                  onClick={() => handleSelectedTask(task, "delete")}
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/ios-glyphs/24/f00000/filled-trash.png"
                    alt="filled-trash"
                  />
                </button>
                <button
                  className="button"
                  onClick={() => handleSelectedTask(task, "edit")}
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/fluency-systems-filled/24/edit.png"
                    alt="edit"
                  />
                </button>
              </div>
              <p>{task.taskTitle}</p>
              <p>{task.priority}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskItem;
