import React from 'react';

import './AddTaskForm.css';

const AddTaskForm = (props) => (
    <div>
        <input className='add-input' type='text' value={props.title} onChange={props.onChange} />
        <button className='add-btn' type='submit' onClick={props.onSubmit}>Add</button>
    </div>
)

export default AddTaskForm;