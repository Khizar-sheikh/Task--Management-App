import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import AddTaskForm from './AddTaskForm';
import TaskList from './../tasks/TaskList';
import { useDispatch } from 'react-redux';
import { useGetTasksQuery } from '../../api/tasksApi';
import { setTasks } from '../../store/tasksSlice';

const TaskContainer = ({ selectedFilter }) => {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const { data: tasks, isLoading, isError } = useGetTasksQuery({ filter: selectedFilter });

    useEffect(() => {
        if (!isLoading && !isError) {
            // Once tasks are fetched, dispatch action to store tasks in Redux store
            dispatch(setTasks(tasks));
        }
    }, [dispatch, tasks, isLoading, isError, selectedFilter]);

    const handleToggleAddTaskForm = () => {
        setShowAddTaskForm(prevState => !prevState);
        setEditedTask(null); // Close edit form when toggling add task form
        setIsEditing(false); // Reset isEditing to false when toggling add task form
    };

    const handleEditTask = (task) => {
        setEditedTask(task);
        setShowAddTaskForm(true); // Show add task form when editing task
        setIsEditing(true); // Set isEditing to true when editing task
    };

    return (
        <div className="w-full p-5">
            <h1 className="text-center text-2xl font-bold mb-8">Project Title</h1>
            <div className="mb-8 flex justify-center">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex"
                    onClick={handleToggleAddTaskForm}
                >
                    <PlusCircle className="w-6 h-6 mr-2 inline-block" /> {showAddTaskForm ? 'Close Form' : 'Add a Task'}
                </button>
            </div>
            {showAddTaskForm && <AddTaskForm isEditing={isEditing} editedTask={editedTask} />}
            {isLoading ? (
                <p>Loading tasks...</p>
            ) : isError ? (
                <p>Error fetching tasks</p>
            ) : (
                <TaskList tasks={tasks} onEdit={handleEditTask} />
            )}
        </div>
    );
};

export default TaskContainer;
