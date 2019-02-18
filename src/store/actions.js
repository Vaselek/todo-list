import axios from '../axios-tasks';

export const UPDATE_CURRENT_TASK = 'UPDATE_CURRENT_TASK';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASK_COMPLETENESS = 'TOGGLE_TASK_COMPLETENESS';


export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';

export const SAVE_TASK_REQUEST = 'SAVE_TASK_REQUEST';
export const SAVE_TASK_SUCCESS = 'SAVE_TASK_SUCCESS';
export const SAVE_TASK_ERROR = 'SAVE_TASK_ERROR';

export const REMOVE_TASK_REQUEST = 'REMOVE_TASK_REQUEST';
export const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
export const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';



export const updateCurrentTask = (title) => {
  return ({type: UPDATE_CURRENT_TASK, title: title})
};

export const addTask = (task) => {
  return dispatch => {
    dispatch(saveTask(task))
  }
};

export const removeTask = (id) => {
  return dispatch => {
    dispatch({type: REMOVE_TASK, id})
    dispatch(removeTaskDistantly(id));
  }
};



export const toggleTaskCompleteness = (id) => {
  return dispatch => {
    dispatch({type: TOGGLE_TASK_COMPLETENESS, id})
    dispatch(updateTaskDistantly(id));
  }
}


export const fetchTasksRequest = () => {
  return {type: FETCH_TASKS_REQUEST};
};

export const fetchTasksSuccess = tasks => {
  return {type: FETCH_TASKS_SUCCESS, tasks};
};

export const fetchTasksError = () => {
  return {type: FETCH_TASKS_ERROR};
};

export const saveTaskRequest = () => {
  return {type: SAVE_TASK_REQUEST};
};

export const saveTaskSuccess = (id) => {
  return {type: SAVE_TASK_SUCCESS, id};
};

export const saveTaskError = () => {
  return {type: SAVE_TASK_ERROR};
};

export const removeTaskRequest = () => {
  return {type: REMOVE_TASK_REQUEST};
};

export const removeTaskSuccess = () => {
  return {type: REMOVE_TASK_SUCCESS};
};

export const removeTaskError = () => {
  return {type: REMOVE_TASK_ERROR};
};

export const updateTaskRequest = () => {
  return {type: UPDATE_TASK_REQUEST};
};

export const updateTaskSuccess = () => {
  return {type: UPDATE_TASK_SUCCESS};
};

export const updateTaskError = () => {
  return {type: UPDATE_TASK_ERROR};
};

export const fetchTasks = () => {
  return dispatch => {
    dispatch(fetchTasksRequest());
    axios.get('/tasks.json').then(response => {
      const data = Object.keys(response.data).map(id => {
        const task = response.data[id]
        task.id = id
        return task
      });
      dispatch(fetchTasksSuccess(data))
    }, error => {
      dispatch(fetchTasksError())
    });
  }
};

export const saveTask = () => {
  return (dispatch, getState) => {
    const taskTitle = getState().currentTask;
    const task = {title: taskTitle, done: false}
    dispatch(saveTaskRequest())
    axios.post('/tasks.json', {...task}).then(() => {
      dispatch(saveTaskSuccess())
      dispatch(fetchTasks());
    }, error => {
      dispatch(saveTaskError())
    });
  }
};

export const removeTaskDistantly = (id) => {
  return (dispatch, getState) => {
    const taskTitle = getState().currentTask;
    dispatch(removeTaskRequest())
    axios.delete('/tasks/' + id + '.json').then(() => {
      dispatch(removeTaskSuccess())
    }, error => {
      dispatch(removeTaskError())
    });
  }
};


export const updateTaskDistantly = (id) => {
  return (dispatch, getState) => {
    const tasks = getState().tasks;
    const task = tasks.filter((task) => task.id === id);
    const status = task[0].done;
    dispatch(updateTaskRequest())
    axios.patch('/tasks/' + id + '.json', {done: status}).then(() => {
      dispatch(updateTaskSuccess())
    }, error => {
      dispatch(updateTaskError())
    });
  }
};
