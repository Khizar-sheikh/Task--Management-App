import { useState } from 'react';
import { useAddProjectMutation } from '../../api/projectsApi';
import { PlusSquare } from 'lucide-react';

const AddProjectForm = () => {
    const [name, setName] = useState('');

    const [addProject, { isLoading, isError }] = useAddProjectMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addProject({ name });
        setName('');
    };
    if (isLoading) {
        return (
            <div>Loading.......</div>
        )
    }
    if (isError) {
        return (
            <div className='text-red-700'>Error</div>
        )
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Project Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    <PlusSquare className="w-6 h-6 mr-2 inline-block" /> Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProjectForm;
