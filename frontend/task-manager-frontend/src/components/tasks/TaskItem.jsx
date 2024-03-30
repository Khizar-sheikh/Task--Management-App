import { useState } from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useDeleteTaskMutation } from '../../api/tasksApi';

/*eslint-disable */
const TaskItem = ({ task, onEdit }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task._id).unwrap();
            // Call the onDeleteSuccess callback provided by TaskContainer
        } catch (error) {
            console.error('Failed to delete task:', error);
            setDeleteError('Failed to delete task. Please try again later.');
        }
    };

    return (
        <li className="bg-gray-100 rounded-lg p-3 mb-2 flex items-center relative">
            <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <div className="flex items-center text-sm mt-1">
                    <span className={`px-2 py-1 rounded-md ${task.important ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-300 text-gray-700'}`}>{task.important ? 'Important' : 'Not Important'}</span>
                    {/* <span className="mx-2">Project ID: {task.project}</span> */}
                    <span>Date: {new Date(task.date).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="ml-auto">
                <MoreVertical className="text-gray-600 cursor-pointer" onClick={toggleOptions} />
                {showOptions && (
                    <div className="absolute right-0 top-0 mt-10 bg-white rounded-md shadow-md py-2 px-4">
                        <button onClick={() => onEdit(task)} className="flex items-center text-gray-600 hover:text-gray-900">
                            <Edit2 className="w-5 h-5 mr-2" />
                            Edit
                        </button>
                        <button onClick={handleDelete} disabled={isDeleteLoading} className="flex items-center text-gray-600 hover:text-gray-900 mt-2">
                            <Trash2 className="w-5 h-5 mr-2" />
                            Delete
                        </button>
                        {deleteError && <div className="text-red-500">{deleteError}</div>}
                    </div>
                )}
            </div>
        </li>
    );
};

export default TaskItem;
