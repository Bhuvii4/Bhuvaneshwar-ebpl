import React from 'react';
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const priorityConfig = {
        Low: {
            colors: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            label: 'Low Priority'
        },
        Medium: {
            colors: 'bg-amber-100 text-amber-700 border-amber-200',
            label: 'Medium Priority'
        },
        High: {
            colors: 'bg-rose-100 text-rose-700 border-rose-200',
            label: 'High Priority'
        }
    };

    const statusConfig = {
        Pending: 'bg-slate-100 text-slate-600',
        Completed: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
    };

    const config = priorityConfig[task.priority] || priorityConfig.Medium;
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`
            group relative bg-white rounded-xl p-5 border transition-all duration-300
            ${isCompleted ? 'border-slate-100 opacity-75' : 'border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50'}
        `}>
            <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${config.colors.split(' ')[1].replace('text', 'bg')}`}></div>

            <div className="flex justify-between items-start mb-3 pr-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${config.colors} border`}>
                    {task.priority}
                </span>

            </div>

            <h3 className={`text-lg font-bold mb-2 leading-tight ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800 group-hover:text-indigo-700 transition-colors'}`}>
                {task.title}
            </h3>

            <p className="text-slate-500 text-sm mb-5 line-clamp-2 min-h-[2.5rem]">
                {task.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-1.5" />
                        <span className={new Date(task.deadline) < new Date() && !isCompleted ? 'text-rose-500 font-bold' : ''}>
                            {format(new Date(task.deadline), 'MMM d')}
                        </span>
                    </div>
                </div>

                <div className="flex space-x-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className={`mt-4 -mx-5 -mb-5 px-5 py-2 text-xs font-medium flex justify-center border-t border-slate-100 ${isCompleted ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-500'}`}>
                {task.status}
            </div>
        </div>
    );
};

export default TaskCard;
