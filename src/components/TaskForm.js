import React, { useState, useEffect } from "react";
import "../assets/styles/TaskList.css";

const TaskForm = ({ title, setTasks, selectedTask, handleSelectedTask }) => {
  const [newTask, setNewTask] = useState({
    taskTitle: "",
    priority: "low",
  });

  const { taskTitle, priority } = newTask;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    console.log("task ==>", newTask);
    const { taskTitle, priority } = newTask;
    if (taskTitle.trim() !== "") {
      if (selectedTask) {
        console.log("task selected==>", newTask);
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks[title.toLowerCase()].map((task) =>
            task.id === selectedTask.id
              ? { ...task, taskTitle: taskTitle, priority: priority }
              : task
          );
          return {
            ...prevTasks,
            [title.toLowerCase()]: updatedTasks,
          };
        });
      } else {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [title.toLowerCase()]: [
            ...prevTasks[title.toLowerCase()],
            {
              id: String(Date.now()),
              taskTitle: taskTitle,
              priority: priority,
            },
          ],
        }));
      }
      setNewTask({
        taskTitle: "",
        priority: "low",
      });
      handleSelectedTask(null);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setNewTask({ ...selectedTask });
    }
  }, [selectedTask]);

  return (
    <div className="task-form">
      <label htmlFor="taskTitle">Task Title</label>
      <input
        type="text"
        placeholder={`Add a new task in ${title}`}
        value={taskTitle}
        name="taskTitle"
        id="taskTitle"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="task-priority">Task Priority</label>
      <select
        id="task-priority"
        name="priority"
        onChange={(e) => handleChange(e)}
        value={priority}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="task-form__action">
        <button onClick={handleAddTask}>
          {selectedTask ? "Update" : "Add"} Task
        </button>
        {selectedTask ? (
          <button className="cancel" onClick={() => handleSelectedTask(null)}>
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TaskForm;
