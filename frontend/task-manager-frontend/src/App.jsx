import { useState } from 'react';
import './App.css'
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import TaskContainer from './components/common/TaskContainer';

function App() {
  const [selectedFilter, setSelectedFilter] = useState('all'); // State to manage selected filter

  const handleFilterChange = (filter) => {
    console.log(typeof filter);
    setSelectedFilter(filter);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar onFilterChange={handleFilterChange} />
        <TaskContainer selectedFilter={selectedFilter} />
      </div>
    </div>
  )
}

export default App