import React, { useState } from 'react';
import './App.css';
import Task from './components/Task'

export default function App() {
  
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  

  const handleNewTask = (event) => {
      event.preventDefault();

      if (newTask.length === 0){
        return;
      }

      const taskItem = {
        text: newTask,
        complete: false
      }

      setTasks([...tasks, taskItem])
      setNewTask("")
  }

  const handleDelete = (index) => {
    const filteredTasks = tasks.filter((todo, i) => {
      return i !== index;
    });

    setTasks(filteredTasks)
  }

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
        if (index === i){
          task.complete = !task.complete;
        }
        return task;
    });    
    setTasks(updatedTasks)
  }
    
    return (
        <div>
            <form onSubmit={(event) => {
              handleNewTask(event);
              }}>
              <input onChange={(event) => {
                setNewTask(event.target.value)
              }} type="text" value={newTask}
              />
              <div>
                <button>Add</button>
              </div>
            </form>

           
            {
              tasks.map((task, index) =>  {

              const taskStyles = [];
              if (task.complete){
                taskStyles.push("strike-through")
              }

                return (
                  <Task key={index} task={task} handleToggleComplete={handleToggleComplete} index={index}
                    handleDelete={handleDelete} taskStyles={taskStyles}/>
               )})
            }
        </div>
    );
}
    
//export default App;

