import ProjectItem from "./ProjectItem";

/*eslint-disable */
const ProjectList = ({ projects }) => {
    if (!projects) {
        return <div>No projects available</div>;
    }

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <ul>
                {projects.map(project => (
                    <ProjectItem key={project._id} project={project} />
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
