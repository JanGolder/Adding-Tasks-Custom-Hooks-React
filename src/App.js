import React, { useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {

  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks}  = useHttp();

  
  useEffect(() => {

  const transformTasks = tasksObj =>{
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };


    fetchTasks({url:'https://custom-hook-react-f3a61-default-rtdb.firebaseio.com/tasks.json'}, transformTasks);
    console.log('wywołanie')
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  console.log(tasks)
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
