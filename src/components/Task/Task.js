import React from 'react';

import './Task.css'

const Task = (props) => (
    <div className='task'>
        {props.title}
        <button onClick={props.remove}>x</button>
        <input type="checkbox" checked={props.done} onChange={props.toggleDone}/>
    </div>
)

export default Task;