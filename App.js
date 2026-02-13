import React, { useState, useMemo } from 'react';
import jobsData from './jobs.json';

// Bonus: Safe Highlighting Component
const HighlightedText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-black rounded-sm px-0.5">{part}</mark>
        ) : <span key={i}>{part}</span>
      )}
    </span>
  );
};

export default function JobListingApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const locations = ['All', ...new Set(jobsData.map(j => j.location))];

  const filteredJobs = useMemo(() => {
    return jobsData
      .filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === 'All' || job.location === locationFilter;
        const matchesType = typeFilter === 'All' || job.type === typeFilter;
        return matchesSearch && matchesLocation && matchesType;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [searchTerm, locationFilter, typeFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Job Search Portal</h1>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-sm mb-8">
          <input 
            type="text" placeholder="Search titles..." 
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select className="border p-2 rounded" onChange={(e) => setLocationFilter(e.target.value)}>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select className="border p-2 rounded" onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-700">
                    <HighlightedText text={job.title} highlight={searchTerm} />
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{job.type}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">📍 {job.location}</p>
            </div>
          )) : <p className="text-center text-gray-500">No matching jobs found.</p>}
        </div>
      </div>
    </div>
  );
}
