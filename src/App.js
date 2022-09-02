import React from 'react';
import './App.css';
import Task from './components/Task'

const App = () => {
  
  // String value for newTask, initial state set to empty 
  const [newTask, setNewTask] = React.useState("");

  // Array for list of tasks, initial state set to empty
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const data = localStorage.getItem('my_tasks');
    
    if (data){
      setTasks(JSON.parse(data));
    }
    
  }, []);

  React.useEffect(() => {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  })
  
  /********  FORM FUNCTIONS *********/

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
    const filteredTasks = tasks.filter((task, i) =>  i !== index);
    setTasks(filteredTasks)
  }

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
        if (index === i) task.complete = !task.complete;
        return task;
    });    
    setTasks(updatedTasks)
  }

  /********** END FORM FUNCTIONS **********/
    
  return (
      <div>
          <form onSubmit={(event) => {handleNewTask(event);}}>
              <input 
                onChange={(event) => {setNewTask(event.target.value)}}       
                type="text" 
                value={newTask}
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
                  <Task 
                    key={index} 
                    task={task} 
                    handleToggleComplete={handleToggleComplete} 
                    index={index} 
                    handleDelete={handleDelete} 
                    taskStyles={taskStyles}
                  />
                )
              }
                      )
            }
      </div>
    );
}
    
export default App;

