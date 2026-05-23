import { useState } from 'react';
import './App.css';
import InstructorList from './components/InstructorList';

function App() {
  const [instructors, setInstructors] = useState([
    { id: "1", name: "Alice Joshson", specialization: "Java", status: "ACTIVE", yearsOfExperience: 5 },
    { id: "2", name: "Kumar K.", specialization: "MongoDB", status: "ACTIVE", yearsOfExperience: 8 },
    { id: "3", name: "Michael Chew", specialization: "React", status: "INACTIVE", yearsOfExperience: 4 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  // 1. Add sorting state
  const [sortOption, setSortOption] = useState("name-asc");

  // 2. Filter logic (from Exercise 5)
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Sorting logic - notice the [...filteredInstructors] to avoid changing original data
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "experience-asc") return a.yearsOfExperience - b.yearsOfExperience;
    if (sortOption === "experience-desc") return b.yearsOfExperience - a.yearsOfExperience;
    return 0;
  });

  return (
    <div className="page">
      <h1>Instructor Management</h1>
      
      {/* 4. Toolbar for Search and Sort */}
      <div className="toolbar">
        <input 
          type="text" 
          placeholder="Search name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="experience-asc">Exp: Low to High</option>
          <option value="experience-desc">Exp: High to Low</option>
        </select>

        <button className="clear-btn" onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      <p className="summary">
        Showing {sortedInstructors.length} of {instructors.length} instructors
      </p>
      
      {/* 5. Pass the SORTED list to the component */}
      <InstructorList instructors={sortedInstructors} />
    </div>
  );
}

export default App;