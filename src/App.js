import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      setFormError(true);
      return;
    }

    addTask({ name: taskName, description: taskDescription });
    setTaskName('');
    setTaskDescription('');
    setFormError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input type="text" placeholder="Task Name" value={taskName}
        onChange={(e) => setTaskName(e.target.value)}/><br/>
      <input type="text" placeholder="Task Description" value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}/><br/>

      {formError && <p>Please fill out all blank fields.</p>}
      <button type="submit">Add Task</button>
    </form>
  );
};

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? 'completed' : ''}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <div>
            <button onClick={() => completeTask(index)}>Complete</button>
            <br/><br/>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <center>
      <h1>Task Tracker App</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
      </center>
    </div>
  );
};

export default App;
