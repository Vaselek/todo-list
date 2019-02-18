import React, {Component} from 'react';
import AddTaskForm from '../components/AddTaskForm/AddTaskForm';
import Task from '../components/Task/Task';
import '../App.css';
import {connect} from 'react-redux';
import {addTask,
        removeTask,
        toggleTaskCompleteness,
        fetchTasksRequest,
        fetchTasksSuccess,
        fetchTasksError,
        saveTaskRequest,
        saveTaskSuccess,
        saveTaskError,
        fetchTasks,
        saveTask,
        removeTaskRequest,
        removeTaskSuccess,
        removeTaskError,
        updateCurrentTask} from "../store/actions";


class Tasks extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  updateCurrentTask = (e) => {
    this.props.updateCurrentTask(e.target.value)
  };

  removeTask = (id) => {
    this.props.removeTask(id)
  }


  render() {
    const tasks = this.props.tasks.map((task, index) => {
      return <Task key={index}
                   title={task.title}
                   done={task.done}
                   toggleDone={() => this.props.toggleTaskCompleteness(task.id)}
                   remove={() => this.removeTask(task.id)}/>
    });
    return (
      <div>
        <AddTaskForm title={this.props.currentTask}
                     onChange={(e) => this.updateCurrentTask(e)}
                     onSubmit={() => this.props.saveTask()}/>
        {tasks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    currentTask: state.currentTask
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: () => dispatch(addTask()),
    removeTask: (id) => dispatch(removeTask(id)),
    toggleTaskCompleteness: (id) => dispatch(toggleTaskCompleteness(id)),
    fetchTasksRequest: () => dispatch(fetchTasksRequest()),
    fetchTasksSuccess: () => dispatch(fetchTasksSuccess()),
    fetchTasksError: () => dispatch(fetchTasksError()),
    saveTaskRequest: () => dispatch(saveTaskRequest()),
    saveTaskSuccess: () => dispatch(saveTaskSuccess()),
    saveTaskError: () => dispatch(saveTaskError()),
    fetchTasks: () => dispatch(fetchTasks()),
    saveTask: () => dispatch(saveTask()),
    updateCurrentTask: (task) => dispatch(updateCurrentTask(task)),
    removeTaskRequest: () => dispatch(removeTaskRequest()),
    removeTaskSuccess: () => dispatch(removeTaskSuccess()),
    removeTaskError: () => dispatch(removeTaskError()),
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

