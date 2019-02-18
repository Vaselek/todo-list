import {UPDATE_CURRENT_TASK,
        ADD_TASK,
        REMOVE_TASK,
        TOGGLE_TASK_COMPLETENESS,
        FETCH_TASKS_REQUEST,
        FETCH_TASKS_SUCCESS,
        FETCH_TASKS_ERROR,
        SAVE_TASK_REQUEST,
        SAVE_TASK_SUCCESS,
        SAVE_TASK_ERROR,
        UPDATE_TASK_REQUEST,
        UPDATE_TASK_SUCCESS,
        UPDATE_TASK_ERROR,
        REMOVE_TASK_REQUEST,
        REMOVE_TASK_SUCCESS,
        REMOVE_TASK_ERROR} from "./actions";

const initialState = {
  currentTask: '',
  tasks: []
};

const updateTasks = (tasks, id) => {
  const newTasks = [... tasks];
  return newTasks.map(task => {
    if (task.id === id) {
      task.done = !task.done;
      return task;
    }
    return task;
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.title
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.push(action.task)
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id)
      };
    case TOGGLE_TASK_COMPLETENESS:
      return {
        ...state,
        tasks: updateTasks(state.tasks, action.id)
      };
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        loading: false
      };
    case FETCH_TASKS_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
