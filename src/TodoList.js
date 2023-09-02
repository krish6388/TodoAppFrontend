import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    // ***************************************ADD A TASK************************************************************************

    const handleAddTask = () => {
        if (newTask.trim() === '') return;

        axios.post('https://todoappbackend-h51x.onrender.com/api/tasks/', { title: newTask, completed: false })
            .then(() => {
                setNewTask('');
                loadTasks();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        loadTasks();
        
      }, []);

    // *********************************************LOAD ALL TASKS**************************************************************

    const loadTasks = () => {
        axios.get('https://todoappbackend-h51x.onrender.com/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    };

    // ******************************************MARK A TASK AS COMPLETE**********************************************************

    const handleToggleComplete = (taskId, completed) => {
        axios.patch(`https://todoappbackend-h51x.onrender.com/api/tasks/${taskId}/`, { completed })
            .then(() => loadTasks())
            .catch(error => console.error(error));
    };

    // ******************************************DELETE A TASKS*******************************************************************

    const handleDeleteTask = (taskId) => {
        axios.delete(`https://todoappbackend-h51x.onrender.com/api/tasks/${taskId}/`)
            .then(() => loadTasks())
            .catch(error => console.error(error));
    };

    // *************************************************PAGE DISPLAY*************************************************************

    return (
        <div>
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <div className='container'>
            <ul >
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task.id, !task.completed)}
                        />
                        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            </div>

            
        </div>
    );
}

export default TodoList;
