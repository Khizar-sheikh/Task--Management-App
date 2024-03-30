import { useState, useEffect } from 'react';
import { useAddTaskMutation, useEditTaskMutation } from '../../api/tasksApi';
import { PlusSquare } from 'lucide-react';
// import { useGetProjectsQuery } from '../../api/projectsApi';

const AddTaskForm = ({ isEditing, editedTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
    const [project, setProject] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    // const { data: projects } = useGetProjectsQuery();

    // Use useEditTaskMutation if isEditing is true, otherwise use useAddTaskMutation
    const mutationHook = isEditing ? useEditTaskMutation : useAddTaskMutation;
    const [mutate, { isLoading, isError }] = mutationHook();

    // Populate form fields with editedTask data when editing
    useEffect(() => {
        if (isEditing && editedTask) {
            setTitle(editedTask.title);
            setDescription(editedTask.description);
            setDueDate(editedTask.date);
            setProject(editedTask.project);
            setIsImportant(editedTask.important);
        }
    }, [isEditing, editedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Editing an existing task
            mutate({
                id: editedTask._id, // Pass the ID of the editedTask
                title,
                description,
                date: dueDate,
                project,
                important: isImportant
            });
        } else {
            // Adding a new task
            mutate({
                title,
                description,
                date: dueDate,
                project,
                important: isImportant
            });
        }
        setTitle('');
        setDescription('');
        setDueDate(new Date().toISOString().split('T')[0]);
        setProject('');
        setIsImportant(false);
    };


    return (
        <div className='w-full flex justify-center'>
            <div className='bg-gray-200 p-6 rounded-lg shadow-md w-3/5 absolute z-50  m-auto"'>
                <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Task" : "Add Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="project" className="block text-gray-700 font-bold mb-2">Project</label>
                        <select
                            id="project"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select Project</option>
                            {projects && projects.map(proj => (
                                <option key={proj._id} value={proj._id}>{proj.name}</option>
                            ))}
                        </select>
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="important" className="block text-gray-700 font-bold mb-2">Important</label>
                        <input
                            type="checkbox"
                            id="important"
                            checked={isImportant}
                            onChange={(e) => setIsImportant(e.target.checked)}
                        />
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex">
                        <PlusSquare className="w-6 h-6 mr-2 inline-block" /> {isEditing ? 'Save Task' : "Add Task"}
                    </button>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p className="text-red-700">Error adding task</p>}
                </form>
            </div>
        </div>
    );
};

export default AddTaskForm;
