import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    return (
      localTasks || {
        added: [],
        started: [],
        completed: [],
      }
    );
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    // Check if the destination is null
    if (!result.destination) {
      return;
    }

    const sourceList = result.source.droppableId;
    const destinationList = result.destination.droppableId;

    if (sourceList === destinationList) {
      // Reorder items within the same list
      const newTasks = reorder(
        tasks[sourceList],
        result.source.index,
        result.destination.index
      );
      setTasks({ ...tasks, [sourceList]: newTasks });
    } else {
      // Move item between lists
      const sourceTasks = [...tasks[sourceList]];
      const destTasks = [...tasks[destinationList]];
      const [removed] = sourceTasks.splice(result.source.index, 1);
      destTasks.splice(result.destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceList]: sourceTasks,
        [destinationList]: destTasks,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="task-app">
      <h2 className="title">Task Manager</h2>
      <h4 className="subtitle">Drag and drop tasks to reorder</h4>
      <h4 className="subtitle">Hover on any task to edit / delete</h4>
      <div className="task-list-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(tasks).map((category, index) => {
            return (
              <TaskList
                key={category}
                title={category}
                setTasks={setTasks}
                tasks={tasks}
                index={index}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
