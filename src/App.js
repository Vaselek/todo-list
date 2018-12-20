import React, {Component} from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import Task from './components/Task/Task';
import './App.css';

class App extends Component {
    state = {
        tasks: [
            {id: 0, title: 'Clean PC', done: true},
            {id: 1, title: 'Wash hands', done: false},
        ],
        currentTask: 'So what else'
    };

    onChange = (e) => {
        this.setState({
            currentTask: e.target.value
        })
    };

    onSubmit = (e) => {
        const tasks = [...this.state.tasks];
        tasks.push({id: (this.state.tasks.length + 1), title: this.state.currentTask});
        this.setState({tasks})
    };

    removeTask = (index) => {
        const tasks = [...this.state.tasks];
        tasks.splice(index, 1);
        this.setState({tasks});
    };

    toggleTaskCompleteness = (index) => {
        const tasks = [...this.state.tasks];
        const task = tasks[index];
        task.done = !task.done;
        debugger;
        this.setState({tasks});
    }

    render() {
        const tasks = this.state.tasks.map((task, index) => {
            return <Task title={task.title}
                         done={task.done}
                         toggleDone={() => this.toggleTaskCompleteness(index)}
                         remove={() => this.removeTask(index)}/>
        });
        return (
            <div>
                <AddTaskForm title={this.state.currentTask}
                             onChange={(e) => this.onChange(e)}
                             onSubmit={() => this.onSubmit()}/>
                {tasks}
            </div>
        );
    }
}

export default App;
