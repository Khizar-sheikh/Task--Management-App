const Sidebar = ({ onFilterChange }) => {
    const handleClick = (filter) => {
        onFilterChange(filter); // Call parent component's filter change handler
    };

    return (
        <div className="sidebar flex flex-col justify-between bg-gray-200 p-4 border-r-2 border-gray-300 w-1/4">
            <div>
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Filters</h2>
                    <div className="mb-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md" onClick={() => handleClick('today')}>Today Tasks</div>
                    <div className="mb-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md" onClick={() => handleClick('next7')}>Next 7 Days Tasks</div>
                    <div className="mb-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md" onClick={() => handleClick('important')}>Important Tasks</div>
                    <div className="mb-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md" onClick={() => handleClick('past7')}>Past 7 Days Task</div>
                    <div className="mb-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md" onClick={() => handleClick('all')}>All Tasks</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
