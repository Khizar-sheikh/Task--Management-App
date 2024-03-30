
/*eslint-disable */
const ProjectItem = ({ project }) => {
    return (
        <li className="bg-gray-100 rounded-lg p-3 mb-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>
        </li>
    );
};

export default ProjectItem;
