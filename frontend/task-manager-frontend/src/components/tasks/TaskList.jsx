import TaskItem from "./TaskItem";

/*eslint-disable */
const TaskList = ({ tasks, onEdit }) => {
    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task._id} task={task} onEdit={onEdit} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
