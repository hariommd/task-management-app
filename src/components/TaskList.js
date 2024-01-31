import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = ({ title, setTasks, tasks, index }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const handleSelectedTask = (task, action) => {
    if (!task) {
      setSelectedTask(null);
      return;
    }
    if (action === "delete") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [title.toLowerCase()]: tasks[title.toLowerCase()].filter(
          (t) => t.id !== task.id
        ),
      }));
      setSelectedTask(null);
    } else if (action === "edit") {
      setSelectedTask(task);
    }
  };
  const taskItems = tasks[title.toLowerCase()];
  return (
    <Droppable droppableId={title.toLowerCase()} index={index}>
      {(provided) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="task-list">
              <h2>{title}</h2>
              <div className="task-container">
                {taskItems.length > 0 ? (
                  taskItems.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      handleSelectedTask={handleSelectedTask}
                    />
                  ))
                ) : (
                  <p className="no-tasks">No tasks in this list</p>
                )}
              </div>
              {provided.placeholder}
              <TaskForm
                title={title}
                setTasks={setTasks}
                selectedTask={selectedTask}
                handleSelectedTask={handleSelectedTask}
              />
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default TaskList;
