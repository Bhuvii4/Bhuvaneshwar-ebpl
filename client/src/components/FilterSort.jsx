import React from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const FilterSort = ({ filterStatus, onFilterStatusChange, filterPriority, onFilterPriorityChange, sortOrder, onSortChange, searchQuery, onSearchChange }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">

            <div className="w-full lg:w-1/3 relative">
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaFilter size={12} />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => onFilterStatusChange(e.target.value)}
                        className="pl-8 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-slate-50 cursor-pointer hover:bg-white transition-colors"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaFilter size={12} />
                    </div>
                    <select
                        value={filterPriority}
                        onChange={(e) => onFilterPriorityChange(e.target.value)}
                        className="pl-8 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-slate-50 cursor-pointer hover:bg-white transition-colors"
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaSortAmountDown size={12} />
                    </div>
                    <select
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="pl-8 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-slate-50 cursor-pointer hover:bg-white transition-colors"
                    >
                        <option value="createdAt">Newest First</option>
                        <option value="deadline">Deadline (Soonest)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSort;
